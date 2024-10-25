let array = [
    {
        firstname1: 'Géza',
        firstname2: 'Ferenc',
        lastname: 'Kocsis',
        married: true,
        pet: 'kutya'
    },
    {
        firstname1: 'Mária',
        firstname2: 'Júlia',
        lastname: 'Horváth',
        married: false,
        pet: 'macska'
    },
    {
        firstname1: 'Ferenc',
        lastname: 'Balogh',
        married: false,
        pet: 'teknős'
    },
    {
        firstname1: 'Gábor',
        firstname2: 'Attila',
        lastname: 'Horváth',
        married: true,
        pet: 'macska'
    },
]

CreateHTMLElement("table", "persontable", document.body)
CreateHTMLElementWithParentID("thead", "personthead", "persontable")
CreateHTMLElementWithParentID("tr", "persontr", "personthead")
RenderTableHeader("persontr")
CreateHTMLElementWithParentID("tbody", "persontbody", "persontable")

RenderTable(array)


const form = document.getElementById("form")
form.addEventListener('submit', function (e) {
    tableBody.innerHTML = ''
    e.preventDefault()
    const lastname = document.getElementById('lastname')
    const firstname1 = document.getElementById('firstname1')
    const firstname2 = document.getElementById('firstname2')
    const married = document.getElementById('married')
    const pet = document.getElementById('pet')

    const lastnameValue = lastname.value
    const firstname1Value = firstname1.value
    let firstname2Value = firstname2.value
    const marriedValue = married.checked
    const petValue = pet.value

    if (validatefields(lastname, firstname1, pet)) {
        array.push({
            lastname: lastnameValue,
            firstname1: firstname1Value,
            firstname2: firstname2Value || undefined,
            married: marriedValue,
            pet: petValue,
        })
    }

    RenderTable()
    console.log(array)
    form.reset()
})



function validatefields(lastnamevali, firstname1vali, petvali) {
    const errormessages = form.querySelectorAll('.error')
    errormessages.forEach(error => error.innerHTML = '')

    let result = true

    if (lastnamevali.value === '') {
        let error = lastnamevali.parentElement.querySelector('.error')
        error.innerHTML = 'Vezetéknév kötelező!'
        result = false
    }
    if (firstname1vali.value === '') {
        let error = firstname1vali.parentElement.querySelector('.error')
        error.innerHTML = 'Keresztnév kötelező!'
        result = false
    }
    if (petvali.value === '') {
        let error = petvali.parentElement.querySelector('.error')
        error.innerHTML = 'Háziállat kötelező!'
        result = false
    }

    return result
}

