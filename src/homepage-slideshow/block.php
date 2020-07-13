<?php
function g16_enqueue_scripts() {
	wp_enqueue_script('block-frontend', plugin_dir_url( __FILE__ ).'block-frontend.js', array('jquery'), null, true);
}
add_action( 'wp_enqueue_scripts', 'g16_enqueue_scripts' );
