import styled from "styled-components"



export default function Teste({index, dia, descrição, valor, tipo}) {




    return (
        <ListItemContainer key={index}>
            <div>
                <span>{dia}</span>
                <strong>{descrição}</strong>
            </div>
            <Value color={tipo}>R$ {valor.toFixed(2)}</Value>
        </ListItemContainer>
    )
}


const Value = styled.p`
  font-size: 16px;
  font-weight: 400;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`


const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`