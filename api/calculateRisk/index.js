module.exports = async function (context, req) {
    const { age, gender, height, weight, bp, family, disease, smoking, alcohol } = req.body;

    if (!age || !gender || !height || !weight || !bp || !family || !disease || !smoking || !alcohol) {
        context.res = { status: 400, body: "Missing fields in request body." };
        return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let riskLevel = 'Low';
    let riskType = 'Minimal Health Risk';
    let riskAdvice = 'Maintain a healthy lifestyle and keep up regular check-ups.';

    const hasHighBP = bp.toLowerCase().includes('high');
    const hasFamilyHistory = family.toLowerCase() === 'yes';
    const hasSeriousDisease = disease.toLowerCase().includes('heart') || disease.toLowerCase().includes('diabetes');
    const smokes = smoking.toLowerCase() === 'yes';
    const drinks = alcohol.toLowerCase() === 'yes';

    let riskScore = 0;

    // Risk factors scoring
    if (bmi > 30) riskScore += 2;
    else if (bmi > 25) riskScore += 1;

    if (hasHighBP) riskScore += 2;
    if (hasFamilyHistory) riskScore += 1;
    if (hasSeriousDisease) riskScore += 1;
    if (smokes) riskScore += 1;
    if (drinks) riskScore += 1;

    // Determine risk level
    if (riskScore >= 5) {
        riskLevel = 'High';
        riskType = 'Increased Health Risk';
        riskAdvice = 'You may be at high risk of chronic conditions like heart disease, stroke, or diabetes. Consult a healthcare provider immediately.';
    } else if (riskScore >= 3) {
        riskLevel = 'Moderate';
        riskType = 'Elevated Health Risk';
        riskAdvice = 'Consider regular health screenings, improving your lifestyle, and monitoring your risk factors closely.';
    }

    context.res = {
        status: 200,
        body: {
            message: "Risk calculation successful",
            riskLevel,
            riskType,
            bmi,
            age,
            gender,
            bp,
            familyHistory: family,
            diseaseInFamily: disease,
            smoking,
            alcohol,
            advice: riskAdvice
        }
    };
};
