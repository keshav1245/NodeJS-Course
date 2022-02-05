

document.querySelector('#weatherForm').addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = document.querySelector('#address').value;
    const error = document.querySelector('#error')
    const location = document.querySelector('#location')
    const forecast = document.querySelector('#forecast')

    error.innerHTML = ""
    location.innerHTML = ""
    forecast.innerHTML = ""
    fetch('http://localhost:3000/weather?address='+address)
    .then(
        (res) =>{
            res.json().then(
                (data) =>{
                    if(data.error){
                        error.innerText = data.error
                        return
                    }
                    location.innerText = data.location
                    forecast.innerText = data.forecast
                }
            )
        }
    )
})