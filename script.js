			var btn1 = document.getElementById("btn1");
			var btn2 = document.getElementById("btn2");
			var flag = 0;
			var turn = 0;
			var log = [];
			var rounds = 5;
			var counter = rounds;

			
		  	$("#count").text(rounds);

			function clicked(btn){
				
				btn.innerHTML = "Wait";
				btn.disabled = true;
				
				changeBtn(btn);
				flag ++;
				turn += flag%2;
				rollDice(btn);
				
				document.getElementById("round").innerHTML = "Round " + turn;
				if(flag%2==0){
					if (turn == rounds){
						gameOver();
						$("#count_label").text(" ");
					}
					else{
						counter--;
						$("#count").text(counter);
					}
				}

			}


			function changeBtn(btn){
				if(btn.id == "btn1"){
					btn2.innerHTML = "Roll Dice!";
					btn2.disabled = false;
				}
				else
				{
					btn1.innerHTML = "Roll Dice!";
					btn1.disabled = false;
				}
			}

			function rollDice(btn){
				var point = Math.floor((Math.random()*10)+1);
				var sum1 = document.getElementById("total1");
				var sum2 = document.getElementById("total2");
				var point1 = document.getElementById("point1");
				var point2 = document.getElementById("point2");
				btn.id == "btn1"? point1.innerHTML = "Round " + turn + ": " + point : point2.innerHTML = "Round " + turn + ": " + point;
				btn.id == "btn1"? sum1.innerHTML =  parseInt(sum1.innerHTML) + point : sum2.innerHTML =  parseInt(sum2.innerHTML) + point;

				if(flag%2 == 0){

					var win = result(sum1, sum2);
					var turn_log = {}
					turn_log['turn'] = turn;
					turn_log['winner'] = win;
					if(win == "Deuce")
						turn_log['total'] = " -- ";
					else
						turn_log['total'] = win=="Player 1"? sum1.innerHTML : sum2.innerHTML;
					log.push(turn_log);

					console.log(log);

					document.getElementById("winner").innerHTML = "Winner: " + win;
				}
				else{
					document.getElementById("winner").innerHTML = "";
				}
			}

			function result(sum1, sum2){
				if(parseInt(sum1.innerHTML) == parseInt(sum2.innerHTML) )
					return "Deuce";
				else{
					parseInt(sum1.innerHTML) > parseInt(sum2.innerHTML) ? winner =  "Player 1" : winner =  "Player 2";
					return winner;
				}
			}

			function gameOver(){
				btn1.innerHTML = "Game Over";
				btn1.disabled = true;
				btn2.innerHTML = "Game Over";
				btn2.disabled = true;
				$("#round").text("Game Over");


				$("#table").append('<tr><th>Round</th> <th>Winner</th> <th>Total Points</th></tr>');
				
				log.forEach(function(i){
					$("#table").append('<tr><th>' + i['turn'] + '</th> <th>' +i['winner']+ '</th> <th>' + i['total'] + '</th></tr>');
				});
			}
		
