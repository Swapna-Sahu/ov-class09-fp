import React, { Component } from "react";
import axios from "axios";
import VoyageDetails from "./VoyageDetails";
import CostWidget from "./CostWidget";
import SuggestedRouteTable from "./SuggestedRouteTable";
import camelcaseKeys from "camelcase-keys";
import MapComponent from "./MapComponent";
import Grid from "@material-ui/core/Grid";
import ScrollWrapper from "./ScrollWrapper";
import { mapOptions } from "../utilities/mapConfiguration";

export default class VoyageDetailsContainer extends Component {
  state = {
    voyageId: this.props.match.params.voyage_id,
    voyage: {},
    vesselReports: [],
    latestVesselReport: {},
    selectedRoute: [],
    departFromPort: "",
    arriveAtPort: "",
    vessel: {}
  };

  componentDidMount() {
    axios
      .get(`/api/voyages/${this.state.voyageId}`)
      .then(voyage => {
        this.setState({
          voyage: camelcaseKeys(voyage.data[0])
        });
      })
      .then(() => {
        // TODO: This should come from get voyage by ID endpoint
        axios
          .get(`/api/ports/${this.state.voyage.departFromPort}`)
          .then(departFromPort => {
            this.setState({
              departFromPort: departFromPort.data[0].name
            });
          });

        // TODO: This should come from get voyage by ID endpoint
        axios
          .get(`/api/ports/${this.state.voyage.arriveAtPort}`)
          .then(arriveAtPort => {
            this.setState({
              arriveAtPort: arriveAtPort.data[0].name
            });
          });

        // TODO: This should come from get voyage by ID endpoint
        axios.get(`/api/vessels/${this.state.voyage.vesselId}`).then(vessel => {
          this.setState({ vessel: camelcaseKeys(vessel.data[0]) });
        });
      });

    axios
      .get(`/api/voyages/${this.state.voyageId}/vessel-reports`)
      .then(vesselReports => {
        const vesselReportsData = camelcaseKeys(vesselReports.data);

        this.setState({
          vesselReports: vesselReportsData,
          latestVesselReport: vesselReportsData[0]
        });
      })
      .then(() => {
        axios
          .get(
            `/api/vessel-reports/${this.state.latestVesselReport.id}/select-route/`
          )
          .then(selectedRoute => {
            const selectedRouteId = selectedRoute.data[0].id;
            axios
              .get(`/api/suggested-routes/${selectedRouteId}`)
              .then(selectedRoute => {
                this.setState({
                  selectedRoute: camelcaseKeys(selectedRoute.data, {
                    deep: true
                  })
                });
              });
          });
      })
      .catch(error => console.error(error));
  }

  render() {
    const {
      voyage,
      vesselReports,
      latestVesselReport,
      departFromPort,
      arriveAtPort,
      vessel,
      selectedRoute
    } = this.state;

    let totalCost = 0;

    if (selectedRoute.length > 0 && selectedRoute[0].totalCost) {
      totalCost = selectedRoute[0].totalCost;
    }

    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <MapComponent
              vesselReports={vesselReports}
              suggestedRoutes={selectedRoute}
              options={mapOptions}
            />
          </Grid>
          <Grid container item xs={4} alignContent={"flex-start"}>
            <ScrollWrapper height={"calc(100vh - 64px)"}>
              <VoyageDetails
                vesselName={vessel.name}
                departFrom={departFromPort}
                arriveAt={arriveAtPort}
                etd={voyage.departureTime}
                eta={latestVesselReport.eta}
                date={latestVesselReport.createdAt}
                latitude={parseFloat(latestVesselReport.latitude)}
                longitude={parseFloat(latestVesselReport.longitude)}
                hsfo={latestVesselReport.hfoConsumption}
                ulsfo={latestVesselReport.lsfoConsumption}
              />
              {selectedRoute.length > 0 && (
                <CostWidget
                  totalCost={totalCost}
                  hfoCost={voyage.hfoCost}
                  lsfoCost={voyage.lsfoCost}
                  hfoConsumption={latestVesselReport.hfoConsumption}
                  lsfoConsumption={latestVesselReport.lsfoConsumption}
                />
              )}
              {selectedRoute.length > 0 && selectedRoute[0].waypoints && (
                <SuggestedRouteTable
                  data={selectedRoute[0].waypoints}
                  tableNames={[
                    "DATE",
                    "LATITUDE",
                    "LONGTIDUE",
                    "SPEED",
                    "EST.RPM"
                  ]}
                />
              )}
            </ScrollWrapper>
          </Grid>
        </Grid>
      </>
    );
  }
}
