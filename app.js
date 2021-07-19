window.onload = function() {
    main()
}


function main() {
    const todo = document.getElementById("todo")
    const done = document.getElementById("done")
    const add = document.getElementById("add")
    const clear = document.getElementById("clear")
    const addTodo = document.getElementById("addTodo")
    const input = document.getElementById("input")

    let todoTab = localStorage.getItem("todoTab")
    
    let doneTab = localStorage.getItem("doneTab")

    if (todoTab == null || todoTab == "[]") {
        todo.parentElement.classList.add("displayNone")
        todoTab = []
    } else {
        todoTab = JSON.parse(todoTab)
        afficheTodo(todoTab)
    }

    if (doneTab == null) {
        done.parentElement.classList.add("displayNone")
        doneTab = []
    }

    // ---------------------------------------------------------ADD------------------------------------//
    add.addEventListener("click", function() {
        addTodo.classList.toggle("displayNone")

        todoTab = JSON.parse(localStorage.getItem("todoTab")) 

        if (todoTab == null || todoTab == "[]") {
            todoTab = []
        }

        document.addEventListener("keydown", function(e) {
            input.autofocus = 1
            if (e.key == "Enter") {
                addTodo.classList.add("displayNone")
                
                if (input.value != "") {

                    todoTab.push(input.value)
                    input.value = ""
                    afficheTodo(todoTab)

                    let todoTabJ = JSON.stringify(todoTab)
                    localStorage.setItem("todoTab", todoTabJ)
                }
            }
        })
    })


    clear.addEventListener("click" , function() {
        localStorage.removeItem("todoTab")
        todoTab = []
        todo.parentElement.classList.add("displayNone")

        localStorage.removeItem("todoDone")
        todoDone = []
        done.parentElement.classList.add("displayNone")
    })


}


function afficheTodo(todoTab) {
    const todo = document.getElementById("todo")
    let html = ""

    todo.parentElement.classList.remove("displayNone")

    for (i in todoTab) {
        html = html + `<li onclick="clicLi(${i})">${todoTab[i]}</li>`
    }

    todo.innerHTML = html
}

function afficheDone(todoDone) {
    const done = document.getElementById("done")
    let html = ""

    done.parentElement.classList.remove("displayNone")

    for (i in todoDone) {
        html = html + `<li>${todoDone[i]}</li>`
    }

    done.innerHTML = html
}

function clicLi(i) {
    let todoTab = localStorage.getItem("todoTab")
    let todoDone = localStorage.getItem("todoDone")
    todoTab = JSON.parse(todoTab)
    todoDone = JSON.parse(todoDone)

    if (todoDone == null) {
        todoDone = []
    }

    todoDone.push(todoTab[i])
    todoTab.splice(i,1)
    afficheTodo(todoTab)
    afficheDone(todoDone)


    todoTab = JSON.stringify(todoTab)
    localStorage.setItem("todoTab", todoTab)
    todoDone = JSON.stringify(todoDone)
    localStorage.setItem("todoDone", todoDone)

}