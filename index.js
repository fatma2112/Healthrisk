module.exports = async function (context, req) {
    context.log('Processing health risk calculation request.');

    // Extract form data from the request body
    const { age, height, weight, bp, family } = req.body;

    // Validate input
    if (!age || !height || !weight || !bp || !family) {
        context.res = {
            status: 400,
            body: "Error: All fields are required."
        };
        return;
    }

    // Calculate BMI
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let risk = 'Low';

    // Risk determination based on BMI, blood pressure, and family history
    if (bmi > 30 || bp.toLowerCase().includes('high') || family.toLowerCase().includes('yes')) {
        risk = 'High';
    } else if (bmi > 25) {
        risk = 'Moderate';
    }

    // Response with the calculated risk
    context.res = {
        status: 200,
        body: {
            message: "Risk calculation successful",
            riskLevel: risk,
            bmi: bmi,
            age: age,
            bp: bp,
            family: family
        }
    };
};
