function simple(a, b) {
    for (a; a <= b; a++) {
        for (let i = 2; i <= a; i++) {
            if (a % i == 0 && i < a) {
                break;
            } else if (a === i) {
                console.log(a);
            }
        }
    }
}

simple(1, 40)