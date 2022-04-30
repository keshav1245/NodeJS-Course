const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test("SHOULD CALCULATE TOTAL WITH TIP", ()=>{
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13)
})

test("SHOULD ALCULATE WITH DEFAULT TIP", () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test("Should convert 32 F to 0 C", ()=>{
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test("Should convert 0 C to 32 F", ()=>{
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

test("Async test case", (done)=>{
    setTimeout(()=>{
        expect(1).toBe(2)
        done()
    }
    ,2000)
})