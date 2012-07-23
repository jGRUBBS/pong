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
				<div id="item-8" class="item">
					<img id="blur-1" class="blur show" src="includes/images/_01_parfum_txtblur.png" />
					<img id="text-1" class="text hide" src="includes/images/_01_parfum_txt.png" />
				</div>
			</div>
			
			
		</div>
	</div>
	
	
<?php include('includes/footer.php'); ?>		