
let studentList = document.getElementsByClassName("student");

Array.from(studentList).forEach((el) => {
    el.addEventListener("click", handleClick);
});

function handleClick(e) {
    console.dir(e.target);
    console.dir(e.target.classList);

    e.target.classList.add("done")
}