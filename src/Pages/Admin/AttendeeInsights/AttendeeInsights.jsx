import SideBar from "../../../Layout/AdminSideBar";
import AttendeeInsightsCharts from "./AttendeeInsights.Charts";

const AttendeeInsights = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <AttendeeInsightsCharts />
    </div>
  );
};

export default AttendeeInsights;
