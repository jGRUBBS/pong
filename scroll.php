<?php include('includes/header.php'); ?>
	
<body>
	
	<img id="ledge" src="includes/images/ledge.png" />
	
	<div id="stage">
		
	</div>	
	
	<div id="scroll-container">
		<div id="inner-scroll-container">
			
			<div id="group-1" class="group">
				<div id="item-1" class="item"><img src="includes/images/01_minibottle.png" /></div>
				<div id="item-2" class="item"><img src="includes/images/02_middlebottle.png" /></div>
				<div id="item-3" class="item"><img src="includes/images/03_dotbottle.png" /></div>
				<div id="item-4" class="item"><img src="includes/images/04_carton.png" /></div>
				<div id="item-5" class="item"><img src="includes/images/05_bodylotion.png" /></div>
				<div id="item-6" class="item"><img src="includes/images/06_showergel.png" /></div>
			</div>	

			<div id="group-2" class="group">
				<div id="item-7" class="item">
					<?php for ($i=1;$i<=13;$i++) { ?>
						<?php $class = ($i != 1) ? 'off' : 'on'; ?>
						<img class="view-<?php echo $i.' '.$class; ?>" src="includes/images/bottle-spin/bottle_view<?php echo $i ?>.png" />
					<?php } ?>	
				</div>
			</div>
			
			<div id="group-3" class="group">
			  <div id="item-8" class="item">
					<img id="blur-1" class="blur show" src="includes/images/_01_parfum_txtblur.png" />
					<img id="text-1" class="text hide" src="includes/images/_01_parfum_txt.png" />
				</div>
			</div>
			
			<div id="group-4" class="group">
			  <div id="item-9" class="item"><img src="includes/images/mini-dot-bottle.png" /></div>
			</div>  
			
			<div id="group-5" class="group">
			  <div id="item-10" class="item">
					<img id="blur-1" class="blur show" src="includes/images/_02_mini_txtblur.png" />
					<img id="text-1" class="text hide" src="includes/images/_02_mini_txt.png" />
				</div>
			</div>
			
			<div id="group-6" class="group">
			  <div id="item-11" class="item"><img src="includes/images/lotion.png" /></div>
			</div>
			
			<div id="group-7" class="group">
			  <div id="item-12" class="item">
			    <img id="blur-1" class="blur show" src="includes/images/_03_lotion_txtblur.png" />
			    <img id="text-1" class="text hide" src="includes/images/_03_lotion_txt.png" />  		
			  </div>
			</div>
			
			<div id="group-8" class="group">
			  <div id="item-13" class="item">
			    <img id="blur-1" class="blur show" src="includes/images/_03_lotion_txtblur.png" />
			    <img id="text-1" class="text hide" src="includes/images/_04_gel_txt.png" />
			  </div>
			</div>
			  
			<div id="group-9" class="group">
			  <div id="item-14" class="item"><img src="includes/images/gel.png" /></div>
			</div>          
			
		</div>
	</div>
	
	
<?php include('includes/footer.php'); ?>		