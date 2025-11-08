import React from "react";
import Script from "next/script";

export default function Buymeacoffee() {
	return (
		<>
			<Script
				src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
				data-name="BMC-Widget"
				data-id="evavic44"
				data-description="Support me on Buy me a coffee!"
				data-message="Thank you for visiting my website. If this app has helped you in anyway, consider buying us a coffee. ✨😎"
				data-color="#FFDD00"
				data-position="Right"
				data-x_margin="18"
				data-y_margin="18"
				strategy="afterInteractive"
				onLoad={() => {
					const evt = new Event("DOMContentLoaded");
					window.dispatchEvent(evt);
				}}
			/>
			<div id="supportByBMC"></div>
		</>
	);
}