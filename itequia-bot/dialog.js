module.exports = {

    error: `
Ups, ha ocurrido algún error :( 
Por favor, inténtalo otra vez."`,

    helpOk: name => `
Entendido, ${ name }! 
Enseguida venimos a ayudarte.`,

    helpLeadsOk: (name, topic) => `
@${ name } necesita *ayuda* con:
 - *${ topic }*.
¿Quién se encarga de echarle una mano?`,

    prOk: name => `
Muy bien, ${ name }! 
Ahora te buscamos a alguien que te haga el code review.`,

    prLeadsOk: (name, project) => `
@${ name } necesita *code review* en el proyecto:
${ project }`,

    usage: `
Hola!
Para pedir ayuda a los tech leads escribe:  
 - *ayuda <tema o problema que tengas>*
Para pedir que asignemos una pull request a alguien, escribe:
 - *pr <url de la pull request>*`

}