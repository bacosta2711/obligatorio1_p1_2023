
		<form>
			<label for="name" > Nombre <!-- Quizas aca en vez de poner la descrition del att conviene poner un span-->
				<input  type="text" id="name" placeholder="Tu nombre..."></br>
			</label>
			
			<span>Empresa</span>
			<select id="company"> 
				<option value = "Todo Viajes SA">Todo Viajes S.A.</option>	
				<option value = "Todo Viajes SA">Alfa</option>	
			</select></br>

			<label for="ticket_name"> Reclamo
				<input  type="text" id="ticket_name" placeholder="El titulo es..."></br>
			</label>

			<label for="ticket_dsc" > 
				<textarea  name="ticket_dsc" id="ticket_dsc" placeholder="Y tu reclamo es ..." cols="30" rows="5" ></textarea></br>	
			</label>
			

			<input type="submit" value="Agregar">	
		</form>
	</section>