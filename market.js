document.addEventListener('DOMContentLoaded', function() {
            const fileInput = document.getElementById('fileInput');
            const browseBtn = document.getElementById('browseBtn');
            const dropZone = document.getElementById('dropZone');
            
            // Browse button click event
            browseBtn.addEventListener('click', () => {
                fileInput.click();
            });
            
            // File input change event
            fileInput.addEventListener('change', handleFile);
            
            // Drag and drop events
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.style.backgroundColor = '#e9e9e9';
            });
            
            dropZone.addEventListener('dragleave', () => {
                dropZone.style.backgroundColor = '#f9f9f9';
            });
            
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.style.backgroundColor = '#f9f9f9';
                
                if (e.dataTransfer.files.length) {
                    fileInput.files = e.dataTransfer.files;
                    handleFile();
                }
            });
            
            // Handle Excel file processing
            function handleFile() {
                if (!fileInput.files.length) return;
                
                const file = fileInput.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, {type: 'array'});
                    
                    // Assuming first sheet contains the data
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
                    
                    // Process the data (in a real app, you would send this to a server)
                    alert(`Successfully loaded ${jsonData.length - 1} products from ${file.name}`);
                    
                    // Here you would typically update the table with the new data
                    // For demonstration, we'll just show an alert
                };
                
                reader.readAsArrayBuffer(file);
            }
            
            // Simple search functionality
            const searchInput = document.querySelector('.search-box');
            const tableRows = document.querySelectorAll('#productTable tbody tr');
            
            searchInput.addEventListener('input', () => {
                const searchText = searchInput.value.toLowerCase();
                
                tableRows.forEach(row => {
                    const productName = row.cells[1].textContent.toLowerCase();
                    const category = row.cells[2].textContent.toLowerCase();
                    
                    if (productName.includes(searchText) || category.includes(searchText)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
