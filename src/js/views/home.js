import React, { useContext, useState, useEffect, useRef } from "react";
import {Context} from "../store/appContext.js";
import "../../styles/home.css";

export const Home = () => {
	const {store, actions}=useContext(Context)
	const [list, setList] = useState([]);
	console.log(useContext(Context));

	const [agendaName, setAgendaName] = useState("");


	
	
	useEffect( () => {
		actions.getAgendas()
		}, [])
	
	
		const handlerGetAgenda = () => {
			actions.getAgendaByName(agendaName)

		}


		return (
		<div className="text-center mt-5">
			<h3>Buscar tu agenda:</h3>
			<input type="text" onChange={(e) => setAgendaName(e.target.value) }/>
			<button onClick={handlerGetAgenda }>Buscar</button>
				
		

			{
				store.listaAgendas.map((e) => {
					return (
						<div key={e.id}>
							<h5>{e.slug}</h5>
						</div>
						)})
				


			}
			

		</div>
		)
};
