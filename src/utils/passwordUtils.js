export function getPasswordStrength(pw) {
    let score = 0;
    const checks = {
        length: pw.length >= 8,
        upper: /[A-Z]/.test(pw),
        lower: /[a-z]/.test(pw),
        number: /[0-9]/.test(pw),
        special: /[^A-Za-z0-9]/.test(pw),
    };
    score = Object.values(checks).filter(Boolean).length;
    const level = score <= 2 ? 1 : score <= 3 ? 2 : 3;
    const labels = ["", "Weak", "Fair", "Strong"];
    return { level, label: labels[level], checks };
}
