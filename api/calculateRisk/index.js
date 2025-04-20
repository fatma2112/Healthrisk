module.exports = async function (context, req) {
    const { age, height, weight, bp, family } = req.body;

    if (!age || !height || !weight || !bp || !family) {
        context.res = { status: 400, body: "Missing fields in request body." };
        return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let risk = 'Low';

    if (bmi > 30 || bp.toLowerCase().includes('high') || family.toLowerCase().includes('yes')) {
        risk = 'High';
    } else if (bmi > 25) {
        risk = 'Moderate';
    }

    context.res = {
        status: 200,
        body: {
            message: "Risk calculation successful",
            riskLevel: risk,
            bmi,
            age,
            bp,
            family
        }
    };
};

