import React, { useRef, useEffect } from 'react';
import './styles.css';

interface PreviewProps {
	code: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
		<script>
			const handleError = err => {
				const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red"><h4>Runtime Error:</h4>' + err + '</div>'
          console.err(err);s
			}
			window.addEventListener('error', e => {
				handleError(e.error)
			})

      window.addEventListener('message', e => {
        try {
          eval(e.data);
        } catch (err) {
          handleError(err)
        }
      },false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>(null);

	useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className="iframe-wrapper">
			<iframe
				title="preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}
			/>
		</div>
	);
};

export default Preview;
