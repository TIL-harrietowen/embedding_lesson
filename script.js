console.log("ello ello");

const viz = document.getElementById("tableauViz");

let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  //embedd a variable in a log
  console.log(`The workbook name is: "${workbook.name}"`);

  //Get the array of dashboards and standalone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}] is: "${element.name}"`);
  });

  // We are normally only interested in interacting with the active sheet (tab), so lets get that
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is "${vizActiveSheet.name}"`);

  // List all of the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    console.log(
      `The worksheet with index [${element.index}] is: "${element.name}"`
    );
  });

  // Assign sheets to the variables created at the top of the script
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

//Log the workbook information once the viz has become interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

//Let JS find the buttons
const oregonAndWashingtonButton = document.getElementById(
  "oregon_and_washington_only_button"
);
const clearFilterButton = document.getElementById("clear_filter_button");
const undoButton = document.getElementById("undo_button");

//Create functions to call when buttons are clicked

function oregonWashFunction() {
  //Log what's pressed
  console.log(oregonAndWashingtonButton.value);

  //Apply the filter to all of the sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearFilterFunction() {
  console.log(clearFilterButton.value);

  //Apply the filter to all of the sheets
  saleMap.clearFilterAsync();
  totalSales.clearFilterAsync();
  salesByProduct.clearFilterAsync();
  salesBySegment.clearFilterAsync();
}

//Wait for click of button
oregonAndWashingtonButton.addEventListener("click", oregonWashFunction);
