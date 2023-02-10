/*creamos los cuadrados del tablero. Tendra diferentes propiedades desestructurando: 
children (hijo),updateBoard (para actualizar el tablero cuando hagamos click) 
y el indice y lo renderizamos dentro de App
*/

export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () => {
        updateBoard(index)
    }
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
} 