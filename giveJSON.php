<?php
	if (isset($_GET["json"])) {
		$file = "fears.json";
		$data = file_get_contents($file);	
		echo $data;
	}
	if (isset($_POST["setJson"])) {
		$data = $_POST["setJson"];
		file_put_contents("fears.json", $data);
	}
?>