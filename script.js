let distressData = {}; // To hold data from Airfield_AC_Curve.xlsx
let distressTypes = [];
let severityLevels = [];

// Fetch distress types and severity levels from text files
/*fetch('Airfield_AC_Distress.txt')
    .then(response => response.text())
    .then(data => {
        distressTypes = data.trim().split('\n');
    })
    .catch(error => console.error('Error loading distress types:', error));*/

distressTypes = [
        "1-Alligator cracking",
        "2-Bleeding",
        "3-Block cracking",
        "4-Corrugation",
        "5-Depression",
        "6-Jet blast",
        "7-Joint Reflection",
        "8-Long. & Trans. Cracking",
        "9-Oil Spillage",
        "10-Patching",
        "11-Polished Aggregate",
        "12-Raveling",
        "13-Rutting",
        "14-Shoving from PCC",
        "15-Slippage Cracking",
        "16-Swelling",
        "17-Weathering"
    ];
    
function DisplayDistressTypes(distressTypes, columns){
    //const columns = 6; // Number of columns
    const maxRows = Math.ceil(distressTypes.length / columns); // Calculate the maximum number of rows needed
    const table = document.getElementById("distressTable");

    // Set the class for the table
    table.className = 'distress-table';

    // Create rows and cells dynamically
    for (let i = 0; i < maxRows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < columns; j++) {
            const index = i + j * maxRows; // Calculate the index based on the current row and column
            const cell = document.createElement("td");
            if (index < distressTypes.length) {
                cell.textContent = distressTypes[index]; // Set the text content of the cell
            }
            cell.className = "distress-cell column-distress"; // Add unique column class for styling
            row.appendChild(cell); // Append the cell to the row
        }
        table.appendChild(row); // Append the row to the table
    }

}


DisplayDistressTypes(distressTypes,6);
/*fetch('Severity.txt')
    .then(response => response.text())
    .then(data => {
        severityLevels = data.trim().split('\n');
    })
    .catch(error => console.error('Error loading severity levels:', error));*/

severityLevels = [
        "L",  // Low
        "M",  // Medium
        "H"   // High
    ];
    

// Function to add a new row to the table
function addRow() {
    const tableBody = document.querySelector('#dynamicTable tbody');
    const newRow = document.createElement('tr');

    // Create the dropdown for Distress Type
    const distressCell = document.createElement('td');
    const distressSelect = document.createElement('select');
    distressTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.trim();
        option.textContent = type.trim();
        distressSelect.appendChild(option);
    });
    //distressSelect.onchange = calculateTotal; // Recalculate when dropdown changes
    distressCell.appendChild(distressSelect);
    newRow.appendChild(distressCell);

    // Create the dropdown for Severity
    const severityCell = document.createElement('td');
    const severitySelect = document.createElement('select');
    severityLevels.forEach(level => {
        const option = document.createElement('option');
        option.value = level.trim();
        option.textContent = level.trim();
        severitySelect.appendChild(option);
    });
    //severitySelect.onchange = calculateTotal; // Recalculate when dropdown changes
    severityCell.appendChild(severitySelect);
    newRow.appendChild(severityCell);

    // Create 10 Quantity input cells
    for (let i = 0; i < 10; i++) {
        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.className = 'quantity';
        //quantityInput.oninput = calculateTotal;
        quantityCell.appendChild(quantityInput);
        newRow.appendChild(quantityCell);
    }

    // Create Total, Density %, Deduct Value columns
    const totalCell = document.createElement('td');
    totalCell.className = 'total';
    newRow.appendChild(totalCell);

    const densityCell = document.createElement('td');
    densityCell.className = 'density';
    newRow.appendChild(densityCell);

    const deductValueCell = document.createElement('td');
    deductValueCell.className = 'deductValue';
    newRow.appendChild(deductValueCell);

    tableBody.appendChild(newRow);
}

// Function to remove the last row from the table
function removeRow() {
    const tableBody = document.querySelector('#dynamicTable tbody');
    if (tableBody.rows.length > 0) {
        tableBody.deleteRow(-1);
    }
}


/*// Function to load the Excel file (Airfield_AC_Curve.xlsx)
async function handleExcelFile() {
    try {
        const response = await fetch('Airfield_AC_Curve.xlsx');
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });

        workbook.SheetNames.forEach(sheetName => {
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            distressData[sheetName] = sheetData; // Store sheet data in distressData
        });

         
    } catch (error) {
        console.error('Error fetching Excel file:', error);
    }
}*/

// Function to load the Excel file (Airfield_AC_Curve.xlsx)
function ReadCurveData() {
    distressData = {
        "1-Alligator cracking": [
            { Density: 0.10, L: 7.45, M: 10.06, H: 16.01 },
            { Density: 0.20, L: 8.94, M: 14.90, H: 21.79 },
            { Density: 0.30, L: 11.17, M: 18.44, H: 25.14 },
            { Density: 0.40, L: 12.85, M: 21.04, H: 27.93 },
            { Density: 0.50, L: 14.90, M: 23.28, H: 29.98 },
            { Density: 0.60, L: 16.39, M: 24.77, H: 32.03 },
            { Density: 0.70, L: 17.69, M: 25.88, H: 33.33 },
            { Density: 0.80, L: 18.99, M: 27.37, H: 34.82 },
            { Density: 0.90, L: 20.11, M: 28.49, H: 36.13 },
            { Density: 1.00, L: 21.04, M: 29.24, H: 37.24 },
            { Density: 2.00, L: 27.37, M: 36.50, H: 45.07 },
            { Density: 3.00, L: 30.91, M: 40.78, H: 50.09 },
            { Density: 4.00, L: 33.71, M: 44.13, H: 54.00 },
            { Density: 5.00, L: 36.13, M: 46.74, H: 57.54 },
            { Density: 6.00, L: 38.18, M: 48.79, H: 60.71 },
            { Density: 7.00, L: 39.66, M: 50.84, H: 63.31 },
            { Density: 8.00, L: 40.97, M: 52.70, H: 65.74 },
            { Density: 9.00, L: 42.27, M: 54.19, H: 68.34 },
            { Density: 10.00, L: 43.39, M: 55.68, H: 70.58 },
            { Density: 20.00, L: 50.84, M: 65.36, H: 83.24 },
            { Density: 30.00, L: 55.87, M: 71.14, H: 89.57 },
            { Density: 40.00, L: 59.78, M: 74.67, H: 93.11 },
            { Density: 50.00, L: 62.76, M: 77.28, H: 95.53 },
            { Density: 60.00, L: 65.55, M: 78.77, H: 97.39 },
            { Density: 70.00, L: 68.16, M: 80.82, H: 98.51 },
            { Density: 80.00, L: 70.02, M: 82.12, H: 99.44 },
            { Density: 90.00, L: 72.07, M: 83.05, H: 100.00 },
            { Density: 100.00, L: 74.86, M: 84.17, H: 100.00 }
        ],
        "2-Bleeding": [
            { Density: 0.1, L: 0, M: 0, H: 0 },
            { Density: 0.2, L: 1.1, M: 1.1, H: 1.1 },
            { Density: 0.3, L: 2.02, M: 2.02, H: 2.02 },
            { Density: 0.4, L: 2.75, M: 2.75, H: 2.75 },
            { Density: 0.5, L: 3.3, M: 3.3, H: 3.3 },
            { Density: 0.6, L: 4.04, M: 4.04, H: 4.04 },
            { Density: 0.7, L: 4.59, M: 4.59, H: 4.59 },
            { Density: 0.8, L: 5.14, M: 5.14, H: 5.14 },
            { Density: 0.9, L: 5.69, M: 5.69, H: 5.69 },
            { Density: 1.0, L: 6.24, M: 6.24, H: 6.24 },
            { Density: 2.0, L: 11.56, M: 11.56, H: 11.56 },
            { Density: 3.0, L: 15.6, M: 15.6, H: 15.6 },
            { Density: 4.0, L: 20.37, M: 20.37, H: 20.37 },
            { Density: 5.0, L: 25.14, M: 25.14, H: 25.14 },
            { Density: 6.0, L: 29.17, M: 29.17, H: 29.17 },
            { Density: 7.0, L: 32.48, M: 32.48, H: 32.48 },
            { Density: 8.0, L: 35.78, M: 35.78, H: 35.78 },
            { Density: 9.0, L: 38.17, M: 38.17, H: 38.17 },
            { Density: 10.0, L: 40.37, M: 40.37, H: 40.37 },
            { Density: 20.0, L: 51.01, M: 51.01, H: 51.01 },
            { Density: 30.0, L: 56.51, M: 56.51, H: 56.51 },
            { Density: 40.0, L: 59.63, M: 59.63, H: 59.63 },
            { Density: 50.0, L: 61.65, M: 61.65, H: 61.65 },
            { Density: 60.0, L: 63.49, M: 63.49, H: 63.49 },
            { Density: 70.0, L: 64.77, M: 64.77, H: 64.77 },
            { Density: 80.0, L: 65.87, M: 65.87, H: 65.87 },
            { Density: 90.0, L: 66.61, M: 66.61, H: 66.61 },
            { Density: 100.0, L: 67.34, M: 67.34, H: 67.34 }
        ],
        "3-Block cracking": [
            { Density: 0.1, L: 5.06, M: 7.88, H: 9.93 },
            { Density: 0.2, L: 5.24, M: 8.07, H: 11.42 },
            { Density: 0.3, L: 5.62, M: 8.44, H: 12.55 },
            { Density: 0.4, L: 6.18, M: 9.01, H: 13.86 },
            { Density: 0.5, L: 6.55, M: 9.38, H: 14.98 },
            { Density: 0.6, L: 6.74, M: 9.94, H: 16.1 },
            { Density: 0.7, L: 7.12, M: 10.32, H: 16.67 },
            { Density: 0.8, L: 7.3, M: 10.69, H: 17.98 },
            { Density: 0.9, L: 7.49, M: 11.26, H: 18.54 },
            { Density: 1.0, L: 7.68, M: 11.63, H: 19.1 },
            { Density: 2.0, L: 9.36, M: 14.26, H: 24.53 },
            { Density: 3.0, L: 10.86, M: 16.14, H: 28.28 },
            { Density: 4.0, L: 12.17, M: 17.82, H: 31.46 },
            { Density: 5.0, L: 13.3, M: 19.14, H: 33.9 },
            { Density: 6.0, L: 14.23, M: 20.26, H: 35.58 },
            { Density: 7.0, L: 14.79, M: 21.39, H: 37.83 },
            { Density: 8.0, L: 15.54, M: 22.33, H: 39.14 },
            { Density: 9.0, L: 16.29, M: 23.26, H: 40.64 },
            { Density: 10.0, L: 16.85, M: 24.2, H: 41.95 },
            { Density: 20.0, L: 20.97, M: 29.83, H: 50.75 },
            { Density: 30.0, L: 23.97, M: 33.96, H: 56.93 },
            { Density: 40.0, L: 26.4, M: 37.52, H: 61.42 },
            { Density: 50.0, L: 28.28, M: 40.71, H: 65.17 },
            { Density: 60.0, L: 30.34, M: 43.71, H: 68.35 },
            { Density: 70.0, L: 31.84, M: 46.72, H: 71.54 },
            { Density: 80.0, L: 33.33, M: 49.53, H: 74.16 },
            { Density: 90.0, L: 34.64, M: 52.53, H: 76.59 },
            { Density: 100.0, L: 35.77, M: 55.35, H: 78.46 }
        ],
        "4-Corrugation": [
            { Density: 0.1, L: 2, M: 5.8, H: 11 },
            { Density: 0.2, L: 3, M: 7.6, H: 16.2 },
            { Density: 0.3, L: 4.2, M: 9.6, H: 20.2 },
            { Density: 0.4, L: 5, M: 11.4, H: 22.4 },
            { Density: 0.5, L: 6, M: 13, H: 25 },
            { Density: 0.6, L: 6.8, M: 14.2, H: 26.8 },
            { Density: 0.7, L: 7.4, M: 15.6, H: 28.2 },
            { Density: 0.8, L: 8.2, M: 16.8, H: 30.2 },
            { Density: 0.9, L: 8.6, M: 17.8, H: 31 },
            { Density: 1.0, L: 9.2, M: 18.8, H: 32.4 },
            { Density: 2.0, L: 14, M: 25.6, H: 41.2 },
            { Density: 3.0, L: 17.2, M: 30.4, H: 46.8 },
            { Density: 4.0, L: 19.6, M: 34.4, H: 51.4 },
            { Density: 5.0, L: 21.8, M: 37.4, H: 55 },
            { Density: 6.0, L: 23.6, M: 40, H: 58 },
            { Density: 7.0, L: 25.6, M: 42.4, H: 60.4 },
            { Density: 8.0, L: 26.6, M: 44.8, H: 63 },
            { Density: 9.0, L: 28, M: 46.6, H: 65.2 },
            { Density: 10.0, L: 29.2, M: 48.4, H: 67.4 },
            { Density: 20.0, L: 38.8, M: 60.8, H: 82.2 },
            { Density: 30.0, L: 45, M: 69.6, H: 92.2 },
            { Density: 40.0, L: 50, M: 76.8, H: 100 },
            { Density: 50.0, L: 54, M: 82.8, H: 100 },
            { Density: 60.0, L: 58.2, M: 88, H: 100 },
            { Density: 70.0, L: 62, M: 93.8, H: 100 },
            { Density: 80.0, L: 65.4, M: 100, H: 100 },
            { Density: 90.0, L: 69, M: 100, H: 100 },
            { Density: 100.0, L: 72, M: 100, H: 100 }
        ],
        "5-Depression": [
            { Density: 0.1, L: 0, M: 5.22, H: 11.94 },
            { Density: 0.2, L: 0.75, M: 6.53, H: 15.67 },
            { Density: 0.3, L: 1.13, M: 7.65, H: 17.72 },
            { Density: 0.4, L: 1.5, M: 8.96, H: 19.4 },
            { Density: 0.5, L: 2.44, M: 10.07, H: 20.9 },
            { Density: 0.6, L: 3, M: 11.38, H: 22.2 },
            { Density: 0.7, L: 3.94, M: 12.5, H: 22.95 },
            { Density: 0.8, L: 4.69, M: 13.43, H: 24.07 },
            { Density: 0.9, L: 5.44, M: 14.37, H: 24.81 },
            { Density: 1.0, L: 6, M: 15.3, H: 25.93 },
            { Density: 2.0, L: 11.26, M: 21.83, H: 32.28 },
            { Density: 3.0, L: 14.82, M: 25.93, H: 36.94 },
            { Density: 4.0, L: 17.45, M: 29.1, H: 39.93 },
            { Density: 5.0, L: 19.51, M: 31.9, H: 42.72 },
            { Density: 6.0, L: 21.58, M: 34.14, H: 45.34 },
            { Density: 7.0, L: 23.45, M: 36.01, H: 47.2 },
            { Density: 8.0, L: 24.95, M: 37.69, H: 48.88 },
            { Density: 9.0, L: 26.08, M: 39.18, H: 50.19 },
            { Density: 10.0, L: 27.39, M: 40.49, H: 52.05 },
            { Density: 20.0, L: 36.21, M: 50.56, H: 62.87 },
            { Density: 30.0, L: 41.84, M: 58.02, H: 70.34 },
            { Density: 40.0, L: 45.78, M: 63.25, H: 75.19 },
            { Density: 50.0, L: 49.53, M: 67.91, H: 80.41 },
            { Density: 60.0, L: 52.72, M: 71.64, H: 84.51 },
            { Density: 70.0, L: 55.72, M: 75.56, H: 88.43 },
            { Density: 80.0, L: 58.16, M: 78.73, H: 91.42 },
            { Density: 90.0, L: 60.41, M: 81.53, H: 94.59 },
            { Density: 100.0, L: 62.48, M: 84.51, H: 96.64 }
        ],
        "6-Jet blast": [
            { Density: 0.1, L: 0, M: 0, H: 0 },
            { Density: 0.2, L: 0.74, M: 0.74, H: 0.74 },
            { Density: 0.3, L: 1.29, M: 1.29, H: 1.29 },
            { Density: 0.4, L: 2.02, M: 2.02, H: 2.02 },
            { Density: 0.5, L: 2.76, M: 2.76, H: 2.76 },
            { Density: 0.6, L: 3.31, M: 3.31, H: 3.31 },
            { Density: 0.7, L: 4.04, M: 4.04, H: 4.04 },
            { Density: 0.8, L: 4.78, M: 4.78, H: 4.78 },
            { Density: 0.9, L: 5.15, M: 5.15, H: 5.15 },
            { Density: 1, L: 5.7, M: 5.7, H: 5.7 },
            { Density: 2, L: 9.38, M: 9.38, H: 9.38 },
            { Density: 3, L: 11.4, M: 11.4, H: 11.4 },
            { Density: 4, L: 13.6, M: 13.6, H: 13.6 },
            { Density: 5, L: 15.63, M: 15.63, H: 15.63 },
            { Density: 6, L: 17.65, M: 17.65, H: 17.65 },
            { Density: 7, L: 19.67, M: 19.67, H: 19.67 },
            { Density: 8, L: 21.51, M: 21.51, H: 21.51 },
            { Density: 9, L: 23.35, M: 23.35, H: 23.35 },
            { Density: 10, L: 25.37, M: 25.37, H: 25.37 },
            { Density: 20, L: 34.93, M: 34.93, H: 34.93 },
            { Density: 30, L: 37.68, M: 37.68, H: 37.68 },
            { Density: 40, L: 39.34, M: 39.34, H: 39.34 },
            { Density: 50, L: 40.26, M: 40.26, H: 40.26 },
            { Density: 60, L: 40.81, M: 40.81, H: 40.81 },
            { Density: 70, L: 41.18, M: 41.18, H: 41.18 },
            { Density: 80, L: 41.36, M: 41.36, H: 41.36 },
            { Density: 90, L: 41.54, M: 41.54, H: 41.54 },
            { Density: 100, L: 41.54, M: 41.54, H: 41.54 }
        ],
        "7-Joint Reflection": [
            { Density: 0.1, L: 0, M: 0, H: 0 },
            { Density: 0.2, L: 0, M: 1.34, H: 3.63 },
            { Density: 0.3, L: 0, M: 2.48, H: 5.15 },
            { Density: 0.4, L: 0, M: 3.44, H: 6.49 },
            { Density: 0.5, L: 0.57, M: 4.2, H: 8.02 },
            { Density: 0.6, L: 0.95, M: 5.34, H: 9.92 },
            { Density: 0.7, L: 1.53, M: 6.11, H: 11.45 },
            { Density: 0.8, L: 2.1, M: 7.06, H: 12.79 },
            { Density: 0.9, L: 2.29, M: 7.82, H: 13.93 },
            { Density: 1, L: 2.86, M: 8.97, H: 15.65 },
            { Density: 2, L: 5.73, M: 16.03, H: 25.19 },
            { Density: 3, L: 7.63, M: 20.8, H: 31.11 },
            { Density: 4, L: 9.16, M: 25, H: 36.45 },
            { Density: 5, L: 10.69, M: 28.44, H: 40.65 },
            { Density: 6, L: 12.02, M: 30.73, H: 44.27 },
            { Density: 7, L: 12.98, M: 33.21, H: 47.52 },
            { Density: 8, L: 13.93, M: 35.11, H: 50.57 },
            { Density: 9, L: 14.89, M: 36.64, H: 52.67 },
            { Density: 10, L: 15.84, M: 38.36, H: 54.58 },
            { Density: 20, L: 21.56, M: 47.33, H: 68.89 },
            { Density: 30, L: 24.81, M: 52.29, H: 75.76 },
            { Density: 40, L: 27.29, M: 54.96, H: 80.34 },
            { Density: 50, L: 29.2, M: 57.06, H: 83.97 },
            { Density: 60, L: 30.73, M: 58.78, H: 86.45 },
            { Density: 70, L: 32.06, M: 60.31, H: 88.93 },
            { Density: 80, L: 33.02, M: 61.45, H: 90.84 },
            { Density: 90, L: 33.97, M: 62.21, H: 91.79 },
            { Density: 100, L: 34.54, M: 63.17, H: 92.94 }
        ],
        "8-Long. & Trans. Cracking": [
            { Density: 0.1, L: 2.67, M: 3.81, H: 7.24 },
            { Density: 0.2, L: 2.48, M: 4.95, H: 9.71 },
            { Density: 0.3, L: 2.86, M: 5.9, H: 11.43 },
            { Density: 0.4, L: 3.24, M: 7.05, H: 12.95 },
            { Density: 0.5, L: 3.81, M: 8, H: 14.48 },
            { Density: 0.6, L: 4.19, M: 8.76, H: 15.81 },
            { Density: 0.7, L: 4.38, M: 9.52, H: 16.95 },
            { Density: 0.8, L: 4.76, M: 10.29, H: 17.9 },
            { Density: 0.9, L: 4.95, M: 10.86, H: 18.86 },
            { Density: 1, L: 5.33, M: 11.24, H: 20 },
            { Density: 2, L: 8, M: 16.38, H: 28 },
            { Density: 3, L: 10.1, M: 19.81, H: 32.95 },
            { Density: 4, L: 12.57, M: 22.67, H: 37.14 },
            { Density: 5, L: 14.48, M: 25.14, H: 40.57 },
            { Density: 6, L: 16.76, M: 27.62, H: 43.43 },
            { Density: 7, L: 18.86, M: 29.71, H: 46.86 },
            { Density: 8, L: 20.57, M: 32.38, H: 49.71 },
            { Density: 9, L: 22.48, M: 34.48, H: 52 },
            { Density: 10, L: 23.81, M: 36.38, H: 53.9 },
            { Density: 20, L: 33.71, M: 49.9, H: 69.33 },
            { Density: 30, L: 38.67, M: 57.14, H: 77.9 },
            { Density: 40, L: 41.71, M: 61.33, H: 83.43 },
            { Density: 50, L: 44.38, M: 64.57, H: 87.62 },
            { Density: 60, L: 46.48, M: 66.86, H: 90.67 },
            { Density: 70, L: 48, M: 68.95, H: 93.14 },
            { Density: 80, L: 49.33, M: 70.86, H: 95.43 },
            { Density: 90, L: 50.29, M: 72, H: 96.95 },
            { Density: 100, L: 51.05, M: 72.76, H: 97.9 }
        ],
        "9-Oil Spillage": [
            { Density: 0.1, L: 2.14, M: 2.14, H: 2.14 },
            { Density: 0.2, L: 2.32, M: 2.32, H: 2.32 },
            { Density: 0.3, L: 2.67, M: 2.67, H: 2.67 },
            { Density: 0.4, L: 3.03, M: 3.03, H: 3.03 },
            { Density: 0.5, L: 3.21, M: 3.21, H: 3.21 },
            { Density: 0.6, L: 3.39, M: 3.39, H: 3.39 },
            { Density: 0.7, L: 3.74, M: 3.74, H: 3.74 },
            { Density: 0.8, L: 3.92, M: 3.92, H: 3.92 },
            { Density: 0.9, L: 4.1, M: 4.1, H: 4.1 },
            { Density: 1, L: 4.28, M: 4.28, H: 4.28 },
            { Density: 2, L: 6.42, M: 6.42, H: 6.42 },
            { Density: 3, L: 7.84, M: 7.84, H: 7.84 },
            { Density: 4, L: 9.27, M: 9.27, H: 9.27 },
            { Density: 5, L: 10.52, M: 10.52, H: 10.52 },
            { Density: 6, L: 11.76, M: 11.76, H: 11.76 },
            { Density: 7, L: 13.19, M: 13.19, H: 13.19 },
            { Density: 8, L: 14.26, M: 14.26, H: 14.26 },
            { Density: 9, L: 15.51, M: 15.51, H: 15.51 },
            { Density: 10, L: 17.11, M: 17.11, H: 17.11 },
            { Density: 20, L: 24.06, M: 24.06, H: 24.06 },
            { Density: 30, L: 26.2, M: 26.2, H: 26.2 },
            { Density: 40, L: 27.45, M: 27.45, H: 27.45 },
            { Density: 50, L: 27.99, M: 27.99, H: 27.99 },
            { Density: 60, L: 28.34, M: 28.34, H: 28.34 },
            { Density: 70, L: 28.52, M: 28.52, H: 28.52 },
            { Density: 80, L: 28.52, M: 28.52, H: 28.52 },
            { Density: 90, L: 28.7, M: 28.7, H: 28.7 },
            { Density: 100, L: 28.52, M: 28.52, H: 28.52 }
        ],
        "10-Patching": [
            { Density: 0.1, L: 1.42, M: 6.39, H: 15.28 },
            { Density: 0.2, L: 1.95, M: 6.75, H: 16.16 },
            { Density: 0.3, L: 2.13, M: 7.46, H: 16.52 },
            { Density: 0.4, L: 2.49, M: 7.64, H: 17.05 },
            { Density: 0.5, L: 2.66, M: 8.17, H: 17.58 },
            { Density: 0.6, L: 3.02, M: 8.35, H: 17.94 },
            { Density: 0.7, L: 3.2, M: 8.88, H: 18.12 },
            { Density: 0.8, L: 3.37, M: 9.24, H: 18.47 },
            { Density: 0.9, L: 3.55, M: 9.59, H: 18.83 },
            { Density: 1, L: 3.91, M: 9.95, H: 19.18 },
            { Density: 2, L: 5.51, M: 12.79, H: 23.09 },
            { Density: 3, L: 7.1, M: 15.1, H: 26.64 },
            { Density: 4, L: 8.53, M: 17.76, H: 29.66 },
            { Density: 5, L: 9.95, M: 19.72, H: 32.5 },
            { Density: 6, L: 11.01, M: 21.85, H: 34.81 },
            { Density: 7, L: 12.08, M: 23.45, H: 36.94 },
            { Density: 8, L: 13.32, M: 25.4, H: 39.43 },
            { Density: 9, L: 14.03, M: 26.82, H: 41.39 },
            { Density: 10, L: 15.1, M: 27.89, H: 42.63 },
            { Density: 20, L: 20.96, M: 38.37, H: 56.13 },
            { Density: 30, L: 24.51, M: 45.47, H: 65.72 },
            { Density: 40, L: 27.71, M: 50.62, H: 73.18 },
            { Density: 50, L: 30.02, M: 55.24, H: 80.11 },
            { Density: 60, L: 32.15, M: 59.15, H: 85.61 },
            { Density: 70, L: 34.1, M: 62.34, H: 90.76 },
            { Density: 80, L: 35.88, M: 65.19, H: 94.67 },
            { Density: 90, L: 37.66, M: 67.67, H: 97.69 },
            { Density: 100, L: 38.72, M: 69.63, H: 99.47 }
        ],
        "11-Polished Aggregate": [
            { Density: 0.1, L: 1.28, M: 1.28, H: 1.28 },
            { Density: 0.2, L: 1.3, M: 1.3, H: 1.3 },
            { Density: 0.3, L: 1.47, M: 1.47, H: 1.47 },
            { Density: 0.4, L: 1.65, M: 1.65, H: 1.65 },
            { Density: 0.5, L: 2.02, M: 2.02, H: 2.02 },
            { Density: 0.6, L: 2.05, M: 2.05, H: 2.05 },
            { Density: 0.7, L: 2.39, M: 2.39, H: 2.39 },
            { Density: 0.8, L: 2.75, M: 2.75, H: 2.75 },
            { Density: 0.9, L: 2.75, M: 2.75, H: 2.75 },
            { Density: 1, L: 3.3, M: 3.3, H: 3.3 },
            { Density: 2, L: 5.5, M: 5.5, H: 5.5 },
            { Density: 3, L: 7.52, M: 7.52, H: 7.52 },
            { Density: 4, L: 9.36, M: 9.36, H: 9.36 },
            { Density: 5, L: 10.83, M: 10.83, H: 10.83 },
            { Density: 6, L: 12.29, M: 12.29, H: 12.29 },
            { Density: 7, L: 13.58, M: 13.58, H: 13.58 },
            { Density: 8, L: 14.86, M: 14.86, H: 14.86 },
            { Density: 9, L: 16.15, M: 16.15, H: 16.15 },
            { Density: 10, L: 17.25, M: 17.25, H: 17.25 },
            { Density: 20, L: 24.77, M: 24.77, H: 24.77 },
            { Density: 30, L: 30.64, M: 30.64, H: 30.64 },
            { Density: 40, L: 34.68, M: 34.68, H: 34.68 },
            { Density: 50, L: 37.98, M: 37.98, H: 37.98 },
            { Density: 60, L: 40.92, M: 40.92, H: 40.92 },
            { Density: 70, L: 43.49, M: 43.49, H: 43.49 },
            { Density: 80, L: 46.24, M: 46.24, H: 46.24 },
            { Density: 90, L: 47.89, M: 47.89, H: 47.89 },
            { Density: 100, L: 50.09, M: 50.09, H: 50.09 }
        ],
        "12-Raveling": [
            { Density: 0.1, L: 1.63, M: 4.7, H: 6.51 },
            { Density: 0.2, L: 1.81, M: 5.06, H: 8.5 },
            { Density: 0.3, L: 1.99, M: 5.61, H: 9.4 },
            { Density: 0.4, L: 2.17, M: 5.97, H: 10.49 },
            { Density: 0.5, L: 2.35, M: 6.87, H: 11.75 },
            { Density: 0.6, L: 2.53, M: 7.41, H: 12.84 },
            { Density: 0.7, L: 2.89, M: 7.78, H: 13.74 },
            { Density: 0.8, L: 3.07, M: 8.14, H: 14.65 },
            { Density: 0.9, L: 3.07, M: 8.68, H: 15.55 },
            { Density: 1, L: 3.44, M: 9.04, H: 16.82 },
            { Density: 2, L: 4.52, M: 11.21, H: 26.04 },
            { Density: 3, L: 5.42, M: 13.38, H: 33.63 },
            { Density: 4, L: 6.51, M: 14.83, H: 38.7 },
            { Density: 5, L: 7.41, M: 16.09, H: 42.68 },
            { Density: 6, L: 7.96, M: 17, H: 45.57 },
            { Density: 7, L: 8.68, M: 18.08, H: 47.92 },
            { Density: 8, L: 9.4, M: 18.99, H: 50.09 },
            { Density: 9, L: 10.13, M: 19.89, H: 51.36 },
            { Density: 10, L: 10.67, M: 20.98, H: 52.26 },
            { Density: 20, L: 14.65, M: 28.57, H: 60.22 },
            { Density: 30, L: 17.36, M: 35.26, H: 64.2 },
            { Density: 40, L: 19.35, M: 39.78, H: 66.18 },
            { Density: 50, L: 20.98, M: 43.94, H: 67.63 },
            { Density: 60, L: 22.24, M: 47.56, H: 68.54 },
            { Density: 70, L: 23.69, M: 50.45, H: 69.26 },
            { Density: 80, L: 25.14, M: 53.16, H: 69.62 },
            { Density: 90, L: 26.4, M: 55.33, H: 69.98 },
            { Density: 100, L: 27.49, M: 56.42, H: 69.98 }
        ],
        "13-Rutting": [
            { Density: 0.1, L: 8.27, M: 12.87, H: 19.67 },
            { Density: 0.2, L: 9.93, M: 15.81, H: 23.53 },
            { Density: 0.3, L: 11.03, M: 17.65, H: 25.92 },
            { Density: 0.4, L: 11.95, M: 19.12, H: 27.57 },
            { Density: 0.5, L: 13.24, M: 20.4, H: 29.23 },
            { Density: 0.6, L: 13.79, M: 21.32, H: 30.7 },
            { Density: 0.7, L: 14.34, M: 22.24, H: 31.8 },
            { Density: 0.8, L: 14.89, M: 22.98, H: 32.72 },
            { Density: 0.9, L: 15.44, M: 23.71, H: 33.64 },
            { Density: 1, L: 15.81, M: 24.26, H: 34.56 },
            { Density: 2, L: 18.75, M: 29.41, H: 40.99 },
            { Density: 3, L: 20.59, M: 32.72, H: 45.4 },
            { Density: 4, L: 22.43, M: 35.11, H: 48.9 },
            { Density: 5, L: 23.9, M: 37.13, H: 51.47 },
            { Density: 6, L: 25.37, M: 38.6, H: 53.86 },
            { Density: 7, L: 26.47, M: 40.44, H: 56.25 },
            { Density: 8, L: 27.57, M: 41.73, H: 58.27 },
            { Density: 9, L: 28.31, M: 43.01, H: 60.11 },
            { Density: 10, L: 29.04, M: 44.12, H: 61.58 },
            { Density: 20, L: 35.11, M: 52.21, H: 74.08 },
            { Density: 30, L: 38.79, M: 57.17, H: 82.17 },
            { Density: 40, L: 41.73, M: 61.58, H: 88.79 },
            { Density: 50, L: 44.3, M: 64.89, H: 94.12 },
            { Density: 60, L: 46.69, M: 68.38, H: 100 },
            { Density: 70, L: 48.71, M: 71.14, H: 100 },
            { Density: 80, L: 50.74, M: 74.08, H: 100 },
            { Density: 90, L: 52.39, M: 76.84, H: 100 },
            { Density: 100, L: 53.49, M: 79.23, H: 100 }
        ],
        "14-Shoving from PCC": [
            { Density: 0.1, L: 2.17, M: 5.96, H: 10.29 },
            { Density: 0.2, L: 2.89, M: 7.4, H: 13.54 },
            { Density: 0.3, L: 3.43, M: 8.66, H: 15.7 },
            { Density: 0.4, L: 4.15, M: 10.11, H: 17.69 },
            { Density: 0.5, L: 4.51, M: 11.19, H: 19.31 },
            { Density: 0.6, L: 5.05, M: 12.09, H: 20.76 },
            { Density: 0.7, L: 5.6, M: 12.82, H: 21.66 },
            { Density: 0.8, L: 5.96, M: 13.72, H: 22.74 },
            { Density: 0.9, L: 6.32, M: 14.26, H: 23.83 },
            { Density: 1, L: 6.68, M: 14.98, H: 25.09 },
            { Density: 2, L: 9.93, M: 20.22, H: 31.59 },
            { Density: 3, L: 11.37, M: 22.92, H: 35.56 },
            { Density: 4, L: 13, M: 25.27, H: 38.99 },
            { Density: 5, L: 14.08, M: 27.08, H: 41.34 },
            { Density: 6, L: 15.16, M: 28.52, H: 43.5 },
            { Density: 7, L: 16.25, M: 30.32, H: 45.49 },
            { Density: 8, L: 17.15, M: 31.59, H: 47.29 },
            { Density: 9, L: 18.05, M: 32.67, H: 48.74 },
            { Density: 10, L: 18.77, M: 33.94, H: 50.54 },
            { Density: 20, L: 24.01, M: 40.79, H: 59.93 },
            { Density: 30, L: 27.98, M: 45.67, H: 66.79 },
            { Density: 40, L: 30.14, M: 49.28, H: 71.48 },
            { Density: 50, L: 32.31, M: 52.53, H: 75.45 },
            { Density: 60, L: 33.94, M: 55.42, H: 78.16 },
            { Density: 70, L: 35.56, M: 57.58, H: 81.23 },
            { Density: 80, L: 37, M: 60.11, H: 83.75 },
            { Density: 90, L: 38.09, M: 61.91, H: 86.1 },
            { Density: 100, L: 38.81, M: 64.26, H: 88.09 }
        ],
        "15-Slippage Cracking": [
            { Density: 0.1, L: 4.27, M: 4.27, H: 4.27 },
            { Density: 0.2, L: 5.19, M: 5.19, H: 5.19 },
            { Density: 0.3, L: 6.31, M: 6.31, H: 6.31 },
            { Density: 0.4, L: 7.24, M: 7.24, H: 7.24 },
            { Density: 0.5, L: 7.98, M: 7.98, H: 7.98 },
            { Density: 0.6, L: 8.72, M: 8.72, H: 8.72 },
            { Density: 0.7, L: 9.46, M: 9.46, H: 9.46 },
            { Density: 0.8, L: 10.39, M: 10.39, H: 10.39 },
            { Density: 0.9, L: 11.13, M: 11.13, H: 11.13 },
            { Density: 1, L: 12.06, M: 12.06, H: 12.06 },
            { Density: 2, L: 19.85, M: 19.85, H: 19.85 },
            { Density: 3, L: 26.35, M: 26.35, H: 26.35 },
            { Density: 4, L: 31.35, M: 31.35, H: 31.35 },
            { Density: 5, L: 35.62, M: 35.62, H: 35.62 },
            { Density: 6, L: 39.52, M: 39.52, H: 39.52 },
            { Density: 7, L: 42.86, M: 42.86, H: 42.86 },
            { Density: 8, L: 46.38, M: 46.38, H: 46.38 },
            { Density: 9, L: 49.17, M: 49.17, H: 49.17 },
            { Density: 10, L: 51.58, M: 51.58, H: 51.58 },
            { Density: 20, L: 65.68, M: 65.68, H: 65.68 },
            { Density: 30, L: 70.87, M: 70.87, H: 70.87 },
            { Density: 40, L: 73.84, M: 73.84, H: 73.84 },
            { Density: 50, L: 75.7, M: 75.7, H: 75.7 },
            { Density: 60, L: 76.99, M: 76.99, H: 76.99 },
            { Density: 70, L: 78.29, M: 78.29, H: 78.29 },
            { Density: 80, L: 79.04, M: 79.04, H: 79.04 },
            { Density: 90, L: 79.41, M: 79.41, H: 79.41 },
            { Density: 100, L: 80.15, M: 80.15, H: 80.15 }
        ],
        "16-Swelling": [
            { Density: 0.1, L: 1.43, M: 10.54, H: 28.57 },
            { Density: 0.2, L: 1.61, M: 11.43, H: 29.29 },
            { Density: 0.3, L: 1.79, M: 11.96, H: 30.18 },
            { Density: 0.4, L: 2.14, M: 12.5, H: 30.89 },
            { Density: 0.5, L: 2.5, M: 12.85, H: 31.25 },
            { Density: 0.6, L: 2.5, M: 13.21, H: 31.96 },
            { Density: 0.7, L: 2.86, M: 13.39, H: 32.32 },
            { Density: 0.8, L: 3.21, M: 13.93, H: 32.86 },
            { Density: 0.9, L: 3.57, M: 14.29, H: 33.21 },
            { Density: 1, L: 3.75, M: 14.46, H: 33.57 },
            { Density: 2, L: 5.89, M: 16.79, H: 38.04 },
            { Density: 3, L: 7.5, M: 20.54, H: 41.61 },
            { Density: 4, L: 9.29, M: 23.21, H: 44.46 },
            { Density: 5, L: 11.07, M: 25.54, H: 47.14 },
            { Density: 6, L: 12.5, M: 27.32, H: 49.46 },
            { Density: 7, L: 13.93, M: 29.29, H: 51.61 },
            { Density: 8, L: 15, M: 30.89, H: 53.39 },
            { Density: 9, L: 16.07, M: 32.32, H: 55.18 },
            { Density: 10, L: 16.96, M: 33.93, H: 56.61 },
            { Density: 20, L: 24.11, M: 44.29, H: 68.57 },
            { Density: 30, L: 29.46, M: 51.79, H: 77.14 },
            { Density: 40, L: 33.04, M: 56.96, H: 83.04 },
            { Density: 50, L: 36.43, M: 61.43, H: 88.21 },
            { Density: 60, L: 38.93, M: 65, H: 92.68 },
            { Density: 70, L: 41.43, M: 67.86, H: 96.96 },
            { Density: 80, L: 43.39, M: 70.71, H: 100 },
            { Density: 90, L: 45.18, M: 73.04, H: 100 },
            { Density: 100, L: 46.61, M: 75.18, H: 100 }
        ],
        "17-Weathering": [
            { Density: 0.1, L: 0, M: 1.64, H: 3.65 },
            { Density: 0.2, L: 0, M: 1.64, H: 4.74 },
            { Density: 0.3, L: 0, M: 1.82, H: 5.66 },
            { Density: 0.4, L: 0, M: 1.82, H: 6.39 },
            { Density: 0.5, L: 0, M: 1.82, H: 6.75 },
            { Density: 0.6, L: 0, M: 1.82, H: 7.3 },
            { Density: 0.7, L: 0, M: 1.82, H: 7.85 },
            { Density: 0.8, L: 0, M: 2.01, H: 8.21 },
            { Density: 0.9, L: 0, M: 2.01, H: 8.76 },
            { Density: 1, L: 0, M: 2.01, H: 8.94 },
            { Density: 2, L: 0.91, M: 2.55, H: 11.68 },
            { Density: 3, L: 0.91, M: 2.92, H: 13.87 },
            { Density: 4, L: 1.28, M: 3.47, H: 15.51 },
            { Density: 5, L: 1.46, M: 3.83, H: 16.97 },
            { Density: 6, L: 1.46, M: 4.38, H: 18.07 },
            { Density: 7, L: 1.64, M: 4.74, H: 18.98 },
            { Density: 8, L: 1.82, M: 5.29, H: 20.26 },
            { Density: 9, L: 2.01, M: 5.66, H: 21.35 },
            { Density: 10, L: 2.19, M: 6.02, H: 22.08 },
            { Density: 20, L: 3.28, M: 9.49, H: 29.2 },
            { Density: 30, L: 4.01, M: 12.41, H: 34.85 },
            { Density: 40, L: 4.56, M: 14.42, H: 39.05 },
            { Density: 50, L: 4.74, M: 16.06, H: 43.25 },
            { Density: 60, L: 5.11, M: 17.52, H: 46.35 },
            { Density: 70, L: 5.29, M: 18.25, H: 49.45 },
            { Density: 80, L: 5.47, M: 19.16, H: 52.19 },
            { Density: 90, L: 5.47, M: 19.89, H: 54.74 },
            { Density: 100, L: 6.02, M: 20.99, H: 57.12 }
        ],
        "CDV_AC": [
            { Total: 0, Q1: 0, Q2: 0, Q3: 0, Q4: 0, Q5: 1000, Q6: 0, Q7: 1000, Q8: 1000, Q9: 1000, Q10: 1000 },
            { Total: 10, Q1: 10, Q2: 3.5, Q3: 0, Q4: 0, Q5: 1001, Q6: 0, Q7: 1001, Q8: 1001, Q9: 1001, Q10: 1001 },
            { Total: 20, Q1: 20, Q2: 10, Q3: 6.5, Q4: 0, Q5: 1002, Q6: 0, Q7: 1002, Q8: 1002, Q9: 1002, Q10: 1002 },
            { Total: 30, Q1: 30, Q2: 17.5, Q3: 13.5, Q4: 8, Q5: 1003, Q6: 8, Q7: 1003, Q8: 1003, Q9: 1003, Q10: 1003 },
            { Total: 40, Q1: 40, Q2: 25, Q3: 21, Q4: 15, Q5: 1004, Q6: 15, Q7: 1004, Q8: 1004, Q9: 1004, Q10: 1004 },
            { Total: 50, Q1: 50, Q2: 33, Q3: 28, Q4: 22.8, Q5: 1005, Q6: 22.8, Q7: 1005, Q8: 1005, Q9: 1005, Q10: 1005 },
            { Total: 60, Q1: 60, Q2: 40, Q3: 36, Q4: 29.2, Q5: 1006, Q6: 29.2, Q7: 1006, Q8: 1006, Q9: 1006, Q10: 1006 },
            { Total: 70, Q1: 70, Q2: 47.5, Q3: 43, Q4: 35.9, Q5: 1007, Q6: 35.9, Q7: 1007, Q8: 1007, Q9: 1007, Q10: 1007 },
            { Total: 80, Q1: 80, Q2: 55.5, Q3: 50, Q4: 41.5, Q5: 1008, Q6: 41.5, Q7: 1008, Q8: 1008, Q9: 1008, Q10: 1008 },
            { Total: 90, Q1: 90, Q2: 62, Q3: 57, Q4: 47, Q5: 1009, Q6: 47, Q7: 1009, Q8: 1009, Q9: 1009, Q10: 1009 },
            { Total: 100, Q1: 100, Q2: 68.8, Q3: 62.5, Q4: 53, Q5: 1010, Q6: 52, Q7: 1010, Q8: 1010, Q9: 1010, Q10: 1010 },
            { Total: 110, Q1: 100, Q2: 75, Q3: 68, Q4: 58, Q5: 1011, Q6: 57, Q7: 1011, Q8: 1011, Q9: 1011, Q10: 1011 },
            { Total: 120, Q1: 100, Q2: 81, Q3: 73.5, Q4: 62.5, Q5: 1012, Q6: 60.5, Q7: 1012, Q8: 1012, Q9: 1012, Q10: 1012 },
            { Total: 130, Q1: 100, Q2: 86, Q3: 78, Q4: 67, Q5: 1013, Q6: 64.4, Q7: 1013, Q8: 1013, Q9: 1013, Q10: 1013 },
            { Total: 140, Q1: 100, Q2: 91.5, Q3: 82.9, Q4: 71.5, Q5: 1014, Q6: 67.8, Q7: 1014, Q8: 1014, Q9: 1014, Q10: 1014 },
            { Total: 150, Q1: 100, Q2: 96, Q3: 87, Q4: 75.5, Q5: 1015, Q6: 70.8, Q7: 1015, Q8: 1015, Q9: 1015, Q10: 1015 },
            { Total: 160, Q1: 100, Q2: 100, Q3: 91, Q4: 79, Q5: 1016, Q6: 74, Q7: 1016, Q8: 1016, Q9: 1016, Q10: 1016 },
            { Total: 170, Q1: 100, Q2: 100, Q3: 94.8, Q4: 82.1, Q5: 1017, Q6: 76.8, Q7: 1017, Q8: 1017, Q9: 1017, Q10: 1017 },
            { Total: 180, Q1: 100, Q2: 100, Q3: 98, Q4: 85, Q5: 1018, Q6: 79, Q7: 1018, Q8: 1018, Q9: 1018, Q10: 1018 }
        ]
    };
           
}


// Function to calculate the total for each row
async function calculateTotal() {
    // Load Excel data only once
    if (Object.keys(distressData).length === 0) {
        //await handleExcelFile();
        ReadCurveData();
    }

    //await handleExcelFile();
    const rows = document.querySelectorAll('#dynamicTable tbody tr');
    rows.forEach(row => {
        const quantities = row.querySelectorAll('.quantity');
        let total = 0;
        quantities.forEach(quantity => {
            const value = parseFloat(quantity.value) || 0;
            total += value;
        });
        row.querySelector('.total').textContent = total;

        // Calculate Density % based on Unit Area from input
        const unitArea = parseFloat(document.getElementById('unitArea').value) || 1;
        const density = (total / unitArea) * 100;
        row.querySelector('.density').textContent = density.toFixed(2);


        // Update Deduct Value based on Distress Type, Severity, and Density
        //const distressType = row.querySelector('select').value;
        //const severity = row.querySelectorAll('select')[1].value;
        
		/*if (distressData[distressType]) {
            const deductValue = interpolate_Deduct_Value(density, distressType, severity);
            
            if (deductValue) {
                row.querySelector('.deductValue').textContent = deductValue.toFixed(2);
            } else {
                row.querySelector('.deductValue').textContent = 'N/A';
            }
        }*/

    });
}

function calculate_DV() {
    const rows = document.querySelectorAll('#dynamicTable tbody tr');
    rows.forEach(row => {
        const distressType = row.querySelector('select').value;
        const severity = row.querySelectorAll('select')[1].value;
        const density = parseFloat(row.querySelector('.density').textContent);
        
        const data = distressData[distressType]; //1-Alligator cracking
    
        if (!data) {
            //document.getElementById("result").innerText = "Selected distress data not found.";
            alert("Selected distress data not found.");
            return;
        }

        const densities = data.map(entry => entry.Density);
        const values = data.map(entry => entry[severity]);

		if (distressData[distressType]) {
            //const deductValue = LinearInterpolation(densities, values, density);
            const deductValue = cubicSplineInterpolation(densities, values, density);
            
            if (deductValue) {
                row.querySelector('.deductValue').textContent = deductValue.toFixed(2);
            } else {
                row.querySelector('.deductValue').textContent = 'N/A';
            }
        }

    });

}

function cubicSplineInterpolation(densities, values, density) {
    // Check if densities and values arrays are of equal length
    if (densities.length !== values.length) {
        throw new Error("Densities and values arrays must have the same length.");
    }

    // Check if the density is out of bounds
    if (density < densities[0] || density > densities[densities.length - 1]) {
        return 0; // Return 0 for out-of-bound densities
    }

    // Step 1: Compute the coefficients for cubic spline
    let n = densities.length - 1;
    let a = values.slice(); // coefficients of the spline
    let b = new Array(n), d = new Array(n), h = new Array(n), alpha = new Array(n);
    
    for (let i = 0; i < n; i++) {
        h[i] = densities[i + 1] - densities[i];
    }

    for (let i = 1; i < n; i++) {
        alpha[i] = (3 / h[i]) * (a[i + 1] - a[i]) - (3 / h[i - 1]) * (a[i] - a[i - 1]);
    }

    let c = new Array(n + 1).fill(0);
    let l = new Array(n + 1).fill(0);
    let mu = new Array(n + 1).fill(0);
    let z = new Array(n + 1).fill(0);

    l[0] = 1;
    mu[0] = 0;
    z[0] = 0;

    for (let i = 1; i < n; i++) {
        l[i] = 2 * (densities[i + 1] - densities[i - 1]) - h[i - 1] * mu[i - 1];
        mu[i] = h[i] / l[i];
        z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
    }

    l[n] = 1;
    z[n] = 0;
    c[n] = 0;

    for (let j = n - 1; j >= 0; j--) {
        c[j] = z[j] - mu[j] * c[j + 1];
        b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
        d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
    }

    // Step 2: Find the interval where density lies and evaluate the spline
    for (let i = 0; i < n; i++) {
        if (density >= densities[i] && density <= densities[i + 1]) {
            let deltaX = density - densities[i];
            return a[i] + b[i] * deltaX + c[i] * Math.pow(deltaX, 2) + d[i] * Math.pow(deltaX, 3);
        }
    }

    return 0; // Shouldn't happen since bounds are already checked
}


function LinearInterpolation(densities, values, density) {
    // Check if densities and values arrays are of equal length
    if (densities.length !== values.length) {
        throw new Error("Densities and values arrays must have the same length.");
    }

    // Check if the density is out of bounds
    if (density < densities[0] || density > densities[densities.length - 1]) {
        return 0; // Return 0 for out-of-bound densities
    }

    let result;
    // Find the interval where the density fits
    for (let i = 0; i < densities.length - 1; i++) {
        if (density >= densities[i] && density <= densities[i + 1]) {
            // Perform linear interpolation
            let t = (density - densities[i]) / (densities[i + 1] - densities[i]);
            result = values[i] + t * (values[i + 1] - values[i]);
        }
    }
    return result;
}

function Count_DV_GreaterThan_Five(DVs) {
    let count5 = 0;
    for(let i = 0; i< DVs.length; i++)
    {
        if(DVs[i] > 5.0)
        {
            count5++;
        }
    }

    return count5;
}

function Sum_Array(DVs) {
    let sum = 0;
    for(let i = 0; i< DVs.length; i++)
    {
        sum += DVs[i];
    }

    return sum;
}

function Calculate_Maximum_CDV(){

    let Max_CDV;
    const Individual_DVs = []; // Initialize an empty array to store the last column values

    const rows = document.querySelectorAll('#dynamicTable tbody tr');
    rows.forEach(row => {
        const Each_DV = parseFloat(row.querySelector('.deductValue').textContent);
        Individual_DVs.push(Each_DV);

    });

    const CountFives = Count_DV_GreaterThan_Five(Individual_DVs);

    if(CountFives <= 1)
    {
        Max_CDV = Sum_Array(Individual_DVs);
    }
    else
    {
        const HDV = Math.max(...Individual_DVs); //Highest DV
        let m = 1 + (9.0/95.0)*(100.0-HDV); //maximum allowable number of distresses less or equal to 10

        // Ensure m has a maximum value of 10
        m = Math.min(m, 10);

        generateTableRows_m();
        Populate_m_Table(HDV, m);

        generateTableRowsCDV();
        Max_CDV = populateCDVTable(Individual_DVs, m);
    }

    generateTableRowsPCI();
    PopulatePCITable(Max_CDV);
   
}

// Function to create PCI rating blocks for ASTM and FAA
function generatePCIRatings(astmRatings, faaRatings) {
    
    // Function to create rating blocks
    function createRatingBlock(rating, columnId, scaleFactor) {
        const column = document.getElementById(columnId);

        const ratingBlock = document.createElement('div');
        ratingBlock.classList.add('rating-block');

        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = rating.color;

        // Set height proportional to the PCI range
        const rangeParts = rating.range.split('-');
        const upperRange = parseInt(rangeParts[1]);
        const lowerRange = parseInt(rangeParts[0]);
        const height = (upperRange - lowerRange) * scaleFactor; // Scale to common height
        //colorBox.style.height = `${height}px`;

        ratingBlock.style.height = `${height}%`;


        // Add label inside the color box for the rating name
        const label = document.createElement('div');
        label.classList.add('label-inside');
        label.innerHTML = `${rating.name}`;

        // Add lower range outside the color box (left side)
        const lowerRangeLabel = document.createElement('div');
        lowerRangeLabel.classList.add('range-label');
        lowerRangeLabel.textContent = lowerRange;

        ratingBlock.appendChild(lowerRangeLabel); // Add the lower range label outside the box
        colorBox.appendChild(label);  // Add the label inside the color box
        ratingBlock.appendChild(colorBox); // Append color box to the block

        column.appendChild(ratingBlock);  // Append block to the respective column

         /*// Add upper range label on the left side (outside the color box)
         const upperRangeLabel = document.createElement('div');
         upperRangeLabel.classList.add('range-label');
         upperRangeLabel.textContent = upperRange; // Change to upper range
 
         ratingBlock.appendChild(upperRangeLabel);
         colorBox.appendChild(label);
         ratingBlock.appendChild(colorBox);
 
         column.appendChild(ratingBlock);*/
    }

    // Clear previous content if necessary
    document.getElementById('astm-column').innerHTML = '<h3>ASTM D5340/FAA PCI Ratings</h3>';
    document.getElementById('faa-column').innerHTML = '<h3>Scale 2 Ratings</h3>';

    const totalHeight = 500; // Total height for scaling (in pixels)
    // Calculate the scale factor for common height
     const scaleFactorASTM = totalHeight / 100; // Scale factor for ASTM ratings
     const scaleFactorFAA = totalHeight / 100;  // Scale factor for FAA ratings

    // Create ASTM ratings on the left
    astmRatings.forEach(rating => createRatingBlock(rating, 'astm-column', scaleFactorASTM));

    // Create FAA ratings on the right
    faaRatings.forEach(rating => createRatingBlock(rating, 'faa-column', scaleFactorFAA));
}

// Updated data for ASTM and FAA PCI Ratings with specified ranges and colors
const astmRatings = [
    { name: "", range: "100-100", color: "#006400" },  // Dark Green
    { name: "Good", range: "85-100", color: "#006400" },  // Dark Green
    { name: "Satisfactory", range: "70-85", color: "#8FBC8F" },  // Light Green
    { name: "Fair", range: "55-70", color: "#FFFF00" },  // Yellow
    { name: "Poor", range: "40-55", color: "#FF6347" },  // Light Red
    { name: "Very Poor", range: "25-40", color: "#FF4500" },  // Medium Red
    { name: "Serious", range: "10-25", color: "#8B0000" },  // Dark Red
    { name: "Failed", range: "0-10", color: "#A9A9A9" }   // Dark Grey
];

const faaRatings = [
    { name: "", range: "100-100", color: "#008000" },  // Green
    { name: "Good", range: "70-100", color: "#008000" },  // Green
    { name: "Fair", range: "55-70", color: "#FFFF00" },  // Yellow
    { name: "Poor", range: "0-55", color: "#FF0000" }   // Red
];

// Call the function to generate the PCI ratings on page load
generatePCIRatings(astmRatings, faaRatings);


// ASTM PCI Rating Function
function getASTMPCIRating(pci) {
    if (pci >= 85 && pci <= 100) {
        return { rating: "Good", color: "#006400" };
    } else if (pci >= 70 && pci < 85) {
        return { rating: "Satisfactory", color: "#8FBC8F" };
    } else if (pci >= 55 && pci < 70) {
        return { rating: "Fair", color: "#FFFF00" };
    } else if (pci >= 40 && pci < 55) {
        return { rating: "Poor", color: "#FF6347" };
    } else if (pci >= 25 && pci < 40) {
        return { rating: "Very Poor", color: "#FF4500" };
    } else if (pci >= 10 && pci < 25) {
        return { rating: "Serious", color: "#8B0000" };
    } else if (pci >= 0 && pci < 10) {
        return { rating: "Failed", color: "#A9A9A9" };
    } else {
        return { rating: "Invalid PCI value", color: "#f2f2f2" };
    }
}

// FAA PCI Rating Function
function getFAAPCIRating(pci) {
    if (pci >= 70 && pci <= 100) {
        return { rating: "Good", color: "#008000" };
    } else if (pci >= 55 && pci < 70) {
        return { rating: "Fair", color: "#FFFF00" };
    } else if (pci >= 0 && pci < 55) {
        return { rating: "Poor", color: "#FF0000" };
    } else {
        return { rating: "Invalid PCI value", color: "#f2f2f2" };
    }
}


function PopulatePCITable(Max_CDV){
    const tableBody = document.querySelector('#dynamicTablePCI tbody');

    const pci = (100 - Max_CDV).toFixed(2);
    let ASTMResult = getASTMPCIRating(pci);
    let FAAResult = getFAAPCIRating(pci);

    InsertOneDataIntoTable(tableBody, Max_CDV, 0, 0);
    InsertOneDataIntoTable(tableBody, pci, 0, 1);
    InsertOneDataIntoTable(tableBody, ASTMResult.rating, 0, 2);
    InsertOneDataIntoTable(tableBody, FAAResult.rating, 0, 3);

    changeCellColor(tableBody, ASTMResult.color, 0, 2);
    changeCellColor(tableBody, FAAResult.color, 0, 3);
}

function Populate_m_Table(HDV, m){
    const tableBody = document.querySelector('#dynamicTablem tbody');

    InsertOneDataIntoTable(tableBody, HDV, 0, 0);
    InsertOneDataIntoTable(tableBody, m.toFixed(2), 0, 1);
}

function changeCellColor(tableBody, color, rowNum, colNo) {
    // Get all rows in the tbody
    const rows = tableBody.getElementsByTagName('tr');

    // Ensure row number is within bounds
    if (rowNum < 0 || rowNum >= rows.length) {
        console.error("Invalid row number");
        return;
    }
    
    const targetRow = rows[rowNum]; // Get the specified row
    const cells = targetRow.getElementsByTagName('td');

    // Ensure column bounds are within range
    if (colNo < 0 || colNo >= cells.length) {
        console.error("Invalid column range");
        return [];
    }

    cells[colNo].style.backgroundColor = color;// Use color
}

function populateCDVTable(Individual_DVs, m) {
    const tableBody = document.querySelector('#dynamicTableCDV tbody');

    // Sort the Individual_DVs array in descending order
    const sortedDVs = [...Individual_DVs].sort((a, b) => b - a);

    // Get the integer and fractional part of m
    const mInt = Math.floor(m);
    const mFraction = m - mInt;

    let no_of_Dv_entries;
    let frac_use;
    if(Individual_DVs.length < m){
        no_of_Dv_entries = Individual_DVs.length;
        frac_use = false;
    }
    else{
        no_of_Dv_entries = mInt + 1;
        frac_use = true;
    }

    const Entered_DVs = []; //
    for(let i =0; i < no_of_Dv_entries; i++){
        Entered_DVs[i] = sortedDVs[i];
    }

    if(frac_use == true){
        Entered_DVs[no_of_Dv_entries-1] *= mFraction;
    }

    let rowNum;
    let total, q;
    let TDV_array = [];
    let q_array = [];
    let CDV_array = [];

    q = Count_DV_GreaterThan_Five(Entered_DVs);

    rowNum = 0;
    while(q!=0)
    {
        total = Sum_Array(Entered_DVs).toFixed(2);

        q_array[rowNum] = q;
        TDV_array[rowNum] = total;

        for(let i =1; i<=no_of_Dv_entries; i++)
        {
            InsertOneDataIntoTable(tableBody, Entered_DVs[i-1], rowNum, i);
        }
        InsertOneDataIntoTable(tableBody, total, rowNum, 11);
        InsertOneDataIntoTable(tableBody, q, rowNum, 12);
                
        let New_Five_Replaced_DVs  = Replace_Smallest_Value_Greater_Than5(Entered_DVs);
        for(let i = 0; i<no_of_Dv_entries; i++){
            if(Entered_DVs.length == New_Five_Replaced_DVs.length){
                Entered_DVs[i] = New_Five_Replaced_DVs[i];
            }
            else{
                alert("Not same length of array after replacement!");
            }
        }

        q = Count_DV_GreaterThan_Five(Entered_DVs);
        rowNum++;
    }

    //Calculate CDV for each row from curve in excel with sheet name = "CDV_AC"
    for(let i =0; i < q_array.length; i++)
    {
        //const distressType = row.querySelector('select').value;
        //const severity = row.querySelectorAll('select')[1].value;
        //const density = parseFloat(row.querySelector('.density').textContent);
        const TDV = TDV_array[i];
        const qq = "Q" + q_array[i];

        const data = distressData["CDV_AC"]; //Corrected DV curve
    
        if (!data) {
            alert("Selected distress data not found.");
            return;
        }

        const TDVs = data.map(entry => entry.Total);
        const qs = data.map(entry => entry[qq]);

		if (distressData["CDV_AC"]) {
            //const deductValue = LinearInterpolation(densities, values, density);
            const C_deductValue = cubicSplineInterpolation(TDVs, qs, TDV);
            
            if (C_deductValue) {
                CDV_array[i] = C_deductValue.toFixed(2);
            }
        }
    }

    for(let i =0; i<q_array.length; i++){
        InsertOneDataIntoTable(tableBody,CDV_array[i], i, 13);
    }
    
    Max_CDV = Math.max(...CDV_array); //Highest CDV
    return Max_CDV;
}

function Replace_Smallest_Value_Greater_Than5(Entered_DVs){

    let minGreaterThan5 = Math.min(...Entered_DVs.filter(value => value > 5));

    for(let i = Entered_DVs.length-1; i>=0; i--){
        if(Entered_DVs[i]==minGreaterThan5){
            Entered_DVs[i] = 5.0;
        }
    }

    return Entered_DVs;
}


function InsertOneDataIntoTable(tableBody, OneData, rowNum, colNo) {
    
    //const tableBody = document.querySelector('#dynamicTableCDV tbody');
    const rows = tableBody.getElementsByTagName('tr');

    // Ensure row number is within bounds
    if (rowNum < 0 || rowNum >= rows.length) {
        console.error("Invalid row number");
        return;
    }
    
    const targetRow = rows[rowNum]; // Get the specified row
    const cells = targetRow.getElementsByTagName('td');

    // Ensure column bounds are within range
    if (colNo < 0 || colNo >= cells.length) {
        console.error("Invalid column range");
        return [];
    }

    cells[colNo].textContent = OneData; // Use value from Entered_DVs or empty string
        
}

function generateTableRowsCDV() {
    const tableBody = document.querySelector('#dynamicTableCDV tbody');
    let tableContent = '';

    for (let i = 1; i <= 10; i++) {
        tableContent += '<tr>';
        tableContent += `<td>${i}</td>`;
        
        // Add 10 empty cells for Deduct Values
        for (let j = 0; j < 10; j++) {
            tableContent += '<td></td>';
        }
        
        // Add cells for Total, q, and CDV
        tableContent += '<td></td><td></td><td></td>';
        
        tableContent += '</tr>';
    }

    tableBody.innerHTML = tableContent;
}

function generateTableRowsPCI() {
    const tableBody = document.querySelector('#dynamicTablePCI tbody');
    let tableContent = '';

    // Create a single row with three empty columns
    tableContent += '<tr>';
    tableContent += '<td></td>';  // First empty column
    tableContent += '<td></td>';  // Second empty column
    tableContent += '<td></td>';  // Third empty column
    tableContent += '<td></td>';  // Fourth empty column
    tableContent += '</tr>';

    // Insert the generated row into the table body
    tableBody.innerHTML = tableContent;
}

function generateTableRows_m() {
    const tableBody = document.querySelector('#dynamicTablem tbody');
    let tableContent = '';

    // Create a single row with three empty columns
    tableContent += '<tr>';
    tableContent += '<td></td>';  // First empty column
    tableContent += '<td></td>';  // Second empty column
    tableContent += '</tr>';

    // Insert the generated row into the table body
    tableBody.innerHTML = tableContent;
}


// Function to populate the dropdown
function populateDropdown() {
    const dropdown = document.getElementById('sheetSelect');

    // Clone the distressTypes array and add "CDV_AC" at the end
    const temp_distressTypes = [...distressTypes, "CDV_AC"];

    // Iterate through distressTypes and create option elements
    temp_distressTypes.forEach((distress, index) => {
        const option = document.createElement('option');
        option.value = distress.trim();//index + 1;// Set the value attribute (you can modify this if needed)
        option.text = distress.trim();   // Set the display text
        dropdown.appendChild(option);
    });
}

// Call the function to populate the dropdown
populateDropdown();

let chart; // To store the Chart instance
// Function to plot the data and generate the table
function plotData() {
    ReadCurveData();
    const selectedSheet = document.getElementById("sheetSelect").value;
    const data = distressData[selectedSheet];
    //alert(selectedSheet);
    let xValues, datasets, xLabel;

    //const CorrChart = 'CDV_AC';

    // Check if it's Sheet1, Sheet2, or Sheet3
    if (selectedSheet === 'CDV_AC') {
        xValues = data.map(item => item.Total); // 'Total' values for Sheet3
        datasets = [];
        // Generate datasets for Q1 to Q10 for Sheet3
        for (let i = 1; i <= 10; i++) {
            datasets.push({
                label: `Q${i}`,
                data: data.map(item => item[`Q${i}`]),
                borderColor: `hsl(${i * 36}, 100%, 50%)`, // Colorful lines
                fill: false
            });
        }

        xLabel = 'Total'; // Label for x-axis in Sheet3

    } else {
        xValues = data.map(item => item.Density); // 'Density' values for Sheet1 and Sheet2
        datasets = [
            {
                label: 'L',
                data: data.map(item => item.L),
                borderColor: 'blue',
                fill: false
            },
            {
                label: 'M',
                data: data.map(item => item.M),
                borderColor: 'green',
                fill: false
            },
            {
                label: 'H',
                data: data.map(item => item.H),
                borderColor: 'red',
                fill: false
            }
        ];

        xLabel = 'Density'; // Label for x-axis in Sheet1 and Sheet2
    }

    //const isLogarithmic = (selectedSheet === 'Sheet1' || selectedSheet === 'Sheet2');
    // Check if logarithmic scaling should be applied
    const isLogarithmic = (selectedSheet !== 'CDV_AC');
    
    // Destroy previous chart if it exists
    if (chart) {
        chart.destroy();
    }

    // Create new chart
    const ctx = document.getElementById("distressChart").getContext("2d");
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    type: isLogarithmic ? 'logarithmic' : 'linear',
                    title: {
                        display: true,
                        text: xLabel
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: selectedSheet === 'CDV_AC' ? 'Corrected Deduct Value (CDV)' : 'Deduct Value (DV)'
                    }
                }
            }
        }
    });

    // Generate table below the graph
    generateDistressTable(data, selectedSheet);
}

// Function to generate the table
function generateDistressTable(data, selectedSheet) {
    const table = document.getElementById("distressTabledata");
    table.innerHTML = ''; // Clear any existing table

    let headers;
    if (selectedSheet === 'CDV_AC') {
        headers = ['Total', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'];
    } else {
        headers = ['Density', 'L', 'M', 'H'];
    }

    const headerRow = table.insertRow();
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Populate table rows
    data.forEach(row => {
        const newRow = table.insertRow();
        headers.forEach(header => {
            const cell = newRow.insertCell();
            cell.textContent = row[header];
        });
    });
}

// Plot data initially for the first sheet
plotData();




// Detect changes in the Unit Area input and update the density and deduct value automatically
//document.getElementById('unitArea').addEventListener('input', calculateTotal);
