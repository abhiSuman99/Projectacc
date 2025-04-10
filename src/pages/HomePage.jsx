import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

  const senarioData = [
    {
      _id: "1",
      key: "SCENARIO-1",
      name: "Valid Accounts with Valid DEA License",
      Description: "SAAS",
      action: ["click", "key-press"],
      path: "/report/valid-accounts",
      dataDomain: "customers",
    },
    {
      _id: "2",
      key: "SCENARIO-2",
      name: "Valid Accounts with Valid DEA License x",
      Description: "SAASs",
      action: ["click", "key-press"],
      path: "/report/valid-accounts",
      dataDomain: "products",
    },
    {
      _id: "3",
      key: "SCENARIO-3",
      name: "Another Scenario",
      Description: "Another Description",
      action: ["click", "key-press"],
      path: "/report/another-report",
      dataDomain: "contracts",
    },
    {
      _id: "4",
      key: "SCENARIO-4",
      name: "Orders Scenario",
      Description: "Order Description",
      action: ["click", "key-press"],
      path: "/report/orders-report",
      dataDomain: "orders",
    },
  ];

  useEffect(() => {
    
    if (section) {
      const matched = senarioData.filter((item) => item.dataDomain === section);
      setFilteredData(matched);
    }
  }, [section]);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">
        Section: <span className="capitalize text-blue-600">{section}</span>
      </h2>

      {filteredData.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((scenario) => (
            <div
              key={scenario._id}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-1">{scenario.name}</h3>
              <p className="text-gray-600 mb-2">{scenario.Description}</p>
              <div className="text-sm text-gray-500">
                <strong>Actions:</strong> {scenario.action.join(", ")}
              </div>
              <button
                onClick={() => navigate(`/home/${section}/${scenario.key}`)}
                className="inline-block mt-3 text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md transition"
              >
                View Report
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No scenarios found for this section.</p>
      )}
    </div>
  );
};

export default HomePage;
