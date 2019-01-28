export default (name, onlyCheck) => {
  const isNewUser = localStorage.getItem("sk-newUser")
  const tour = JSON.parse(localStorage.getItem("sk-tour")) || []
  const isTour = tour.indexOf(name) == -1

  if (isNewUser != "yes") return false

  if (isTour && !onlyCheck) {
    tour.push(name)
    localStorage.setItem("sk-tour", JSON.stringify(tour))
  }

  return isTour
}