document.getElementById('family').addEventListener('change', function () {
    const diseaseGroup = document.getElementById('diseaseGroup');
    diseaseGroup.style.display = this.value === 'yes' ? 'block' : 'none';
  });
  
  document.getElementById('riskForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bp = document.getElementById('bp').value.toLowerCase();
    const family = document.getElementById('family').value.toLowerCase();
    const smoking = document.getElementById('smoking').value.toLowerCase();
    const alcohol = document.getElementById('alcohol').value.toLowerCase();
    const disease = document.getElementById('disease').value.trim();
  
    const resultBox = document.getElementById('result');
  
    if (height < 60 || weight <= 0 || age <= 0) {
      alert('Please enter valid positive values. Height must be at least 60 cm.');
      return;
    }
  
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let risk = 'Low';
    let riskType = '✅ Minimal Health Risk';
  
    // Determine base risk
    if (
      bmi > 30 ||
      bp.includes('high') ||
      family === 'yes' ||
      smoking === 'yes' ||
      alcohol === 'yes'
    ) {
      risk = 'High';
      // Specific High Risk Type
      if (bp.includes('high') || smoking === 'yes') {
        riskType = '🫀 High Heart Attack Risk';
      }
      if (bmi > 35 || (family === 'yes' && disease.toLowerCase().includes('cancer'))) {
        riskType = '☠️ Severe / Life-Threatening Risk';
      }
    } else if (bmi > 25) {
      risk = 'Moderate';
      riskType = '⚠️ Mild Health Risk';
    }
  
    // Show result
    resultBox.innerHTML = `
      <h2>🔎 Risk Level: ${risk}</h2>
      <p><strong>Risk Type:</strong> ${riskType}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>BMI:</strong> ${bmi}</p>
      <p><strong>Blood Pressure:</strong> ${bp}</p>
      <p><strong>Family History:</strong> ${family}</p>
      ${family === 'yes' && disease ? `<p><strong>Disease in Family:</strong> ${disease}</p>` : ''}
      <p><strong>Smoking:</strong> ${smoking}</p>
      <p><strong>Alcohol:</strong> ${alcohol}</p>
    `;
  
    resultBox.style.display = 'block';
  });
  