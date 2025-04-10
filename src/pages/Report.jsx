import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Report = () => {
  const { reportId } = useParams();
// report id - parmas 
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filterConfig, setFilterConfig] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [ pageNumber , setPageNumber]=useState(1);
  const [ pageSize , setPageSize]=useState(10);
  const[totalRecord,setTotalRecord]=useState(0);
  const [tableData, setTableData] = useState([
    {
      GLN: "0000000000000",
      accountFax: "7",
      accountGroup: "ZPSH",
      accountGroupDesc: "Pharma Ship-To Party",
      accountPhoneCountryCode: "1",
      address1: "227 S BROADWAY",
      customer: "2150002097",
      customerClassification: "04",
      customerClassificationDesc: "RETAIL CHAIN",
      CustomerCreationDate: "11/04/2015",
      deaLicense: "BC4014623",
      eReceiverEnableFlag: "No",
      generalDeletionFlag: "X",
      generalDeliveryBlock: null,
      generalOrderBlock: null,
      industryKey: null,
      industryKeyDesc: null,
      name: "RED CROSS PHARMACY INC",
      name2: null,
      name3: null,
      name4: null,
      pricedAsMasterFlag: null,
      primaryBusinessUnit: null,
      primaryBusinessUnitDesc: null,
      primaryContactEmail: "1",
      primaryContactName: "1",
      primaryContactPersonNumber: "1"
    },
    {
      GLN: "0000000000001",
      accountFax: "8",
      accountGroup: "ZWHL",
      accountGroupDesc: "Wholesale Partner",
      accountPhoneCountryCode: "1",
      address1: "500 E MAIN ST",
      customer: "2150002098",
      customerClassification: "02",
      customerClassificationDesc: "WHOLESALER",
      CustomerCreationDate: "12/05/2016",
      deaLicense: "XY2019456",
      eReceiverEnableFlag: "Yes",
      generalDeletionFlag: null,
      generalDeliveryBlock: null,
      generalOrderBlock: "Y",
      industryKey: "MED",
      industryKeyDesc: "Medical",
      name: "BIG WHOLESALE MEDICINES",
      name2: null,
      name3: null,
      name4: null,
      pricedAsMasterFlag: "Y",
      primaryBusinessUnit: "BU01",
      primaryBusinessUnitDesc: "Business Unit East",
      primaryContactEmail: "contact@bigwholesale.com",
      primaryContactName: "Alice Smith",
      primaryContactPersonNumber: "1001"
    }
  ]);

  const response2 = {
    scenerioKey: "SCENARIO-1",
    key: "SCENERIO-FILTERS-1",
    widgets: {
      filters: [
        {
          name: "Date Filter",
          dataKey: "dateFilter",
          displayName: "Choose Date",
          index: 0,
          visible: true,
          attributes: [
            { key: "type", value: "date-picker" },
            { key: "defaultValue", value: "2024-01-01" },
            { key: "width", value: "10em" }
          ]
        },
        {
          name: "Product Name",
          dataKey: "productFilter",
          displayName: "Product",
          index: 1,
          visible: true,
          attributes: [
            { key: "type", value: "text-input" },
            { key: "defaultValue", value: "Enter Name" },
            { key: "width", value: "10em" }
          ]
        },
        {
          name: "Days Filter",
          dataKey: "daysFilter",
          displayName: "Within Days",
          index: 2,
          visible: true,
          attributes: [
            { key: "type", value: "dropdown" },
            { key: "options", value: "30,60,90,120" },
            { key: "defaultValue", value: "30" },
            { key: "width", value: "10em" }
          ]
        }
      ]
    }
  };

  useEffect(() => {
    // filter api 
    if (reportId?.toUpperCase() === response2.scenerioKey.toUpperCase()) {
      setFilterConfig(response2.widgets.filters);
      const initialValues = {};
      response2.widgets.filters.forEach((filter) => {
        const defaultValue = getAttrValue(filter.attributes, "defaultValue") || "";
        initialValues[filter.dataKey] = defaultValue;
      });
      setFormValues(initialValues);
    }
    setSelectedColumns(Object.keys(tableData[0] || {})); 
  }, [reportId]);

  const getAttrValue = (attributes, key) =>
    attributes.find((attr) => attr.key === key)?.value;

  const handleChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    // table api call 
    // const payload=[

    // ]
  
    console.log("Submitted Filters: ", formValues);
  };

  const allColumns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const toggleColumn = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto overflow-x-auto">
      <h2 className="text-2xl font-bold text-blue-600">Filters for {reportId}</h2>

      {filterConfig ? (
        <>
          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterConfig.map((filter) => {
              const type = getAttrValue(filter.attributes, "type");
              const width = getAttrValue(filter.attributes, "width") || "100%";
              const options = getAttrValue(filter.attributes, "options");

              return (
                <div
                  key={filter.dataKey}
                  className="flex flex-col bg-white shadow-md rounded-xl p-4 border border-gray-200"
                  style={{ minWidth: width }}
                >
                  <label className="font-semibold text-gray-700 mb-2">
                    {filter.displayName}
                  </label>

                  {type === "date-picker" && (
                    <input
                      type="date"
                      value={formValues[filter.dataKey]}
                      onChange={(e) => handleChange(filter.dataKey, e.target.value)}
                      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}

                  {type === "text-input" && (
                    <input
                      type="text"
                      value={formValues[filter.dataKey]}
                      onChange={(e) => handleChange(filter.dataKey, e.target.value)}
                      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}

                  {type === "dropdown" && (
                    <select
                      value={formValues[filter.dataKey]}
                      onChange={(e) => handleChange(filter.dataKey, e.target.value)}
                      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      {options.split(",").map((opt) => (
                        <option key={opt} value={opt}>
                          {opt} Days
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>

          {/* Column Selector */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Select Columns to Display:</h3>
            <div className="flex flex-wrap gap-4">
              {allColumns.map((col) => (
                <label key={col} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(col)}
                    onChange={() => toggleColumn(col)}
                  />
                  {col}
                </label>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {selectedColumns.map((col) => (
                    <th
                      key={col}
                      className="text-left px-4 py-2 border border-gray-300 text-sm font-semibold"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-gray-200">
                    {selectedColumns.map((col) => (
                      <td
                        key={col}
                        className="px-4 py-2 text-sm border border-gray-200"
                      >
                        {row[col] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No filters found for this scenario.</p>
      )}
    </div>
  );
};

export default Report;
