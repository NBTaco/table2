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
const tableBody = document.createElement("tbody")
const table = document.createElement("table")
const tableHeader = document.createElement("thead")
const tableHeaderRow = document.createElement("tr")


createTableCell("td",'Vezetéknév', tableHeaderRow )


const tableHeaderRowFirstName = document.createElement("th")
tableHeaderRowFirstName.innerHTML = "Keresztnév"

const tableHeaderRowPet = document.createElement("th")
tableHeaderRowPet.innerHTML = "Pet"

const tableHeaderRowMarried = document.createElement("th")
tableHeaderRowMarried.innerHTML = "Házas"

tableHeaderRowFirstName.colSpan = 2

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

RenderTable()

document.body.appendChild(table)
table.appendChild(tableHeader)
tableHeader.appendChild(tableHeaderRow)
tableHeaderRow.appendChild(tableHeaderRowFirstName)
tableHeaderRow.appendChild(tableHeaderRowMarried)
tableHeaderRow.appendChild(tableHeaderRowPet)

table.appendChild(tableBody)

function RenderTable() {
    tableBody.innerHTML = ''
    for (const person of array) {
        const tr = document.createElement("tr")

        tr.addEventListener('click', function (e) {
            const selectedrow = tableBody.querySelector('.selected')
            if (selectedrow) {
                selectedrow.classList.remove('selected')
            }
            e.currentTarget.classList.add('selected')
        })

        const tdLastName = document.createElement("td")
        tdLastName.innerHTML = person.lastname
        tr.appendChild(tdLastName)

        const tdFirstName1 = document.createElement("td")
        tdFirstName1.innerHTML = person.firstname1
        tr.appendChild(tdFirstName1)

        if (person.firstname2) {
            const tdFirstName2 = document.createElement("td")
            tdFirstName2.innerHTML = person.firstname2
            tr.appendChild(tdFirstName2)
        } else {
            tdFirstName1.colSpan = 2
        }

        const tdMarried = document.createElement("td")
        tdMarried.innerHTML = person.married ? "Igen" : "Nem"
        tr.appendChild(tdMarried)

        const tdPet = document.createElement("td")
        tdPet.innerHTML = person.pet
        tr.appendChild(tdPet)

        tableBody.appendChild(tr)
    }
}

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
    /**
 *
 * @param {'td' | 'th'} tagName
 * @param {string} innerHTML
 * @param {HTMLTableRowElement} parent
 * @returns {HTMLTableCellElement}
 */

function createTableCell(tagName, innerHTML, parent){
    const cell = document.createElement(tagName);
    cell.innerHTML = innerHTML;
    parent.appendChild(cell)
}