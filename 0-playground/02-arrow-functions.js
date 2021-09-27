// const square = function(x){
//     return x*x;
// }

// const square = (x) => {
//     return x * x
// }

// const square = x => {
//     return x * x
// }

// const square = (x) => x*x

// const square = x => x*x

// console.log(square(3))

const event = {
    name : "Birthday Party",
    guestList : ['Keshav', "Aarushi", "Abhijeet"],
    printGuestList : function () {
        console.log('Guest List for ' + this.name)
        // this.guestList.forEach(function(guest){
        //     console.log(guest + " is attending the "+this.name)
        // })
        // Here this doesnt work as the callback has its own binding for this keyword.
        // Workaround includes have a const self = this and then accessing self.name


        //another workaround is arrow functions
        
        this.guestList.forEach((guest) => {
            console.log(guest + " is attending the "+this.name)
        })
    }
}
// In Arrow functions, we dont bind this keyword. So use a standard function

event.printGuestList()