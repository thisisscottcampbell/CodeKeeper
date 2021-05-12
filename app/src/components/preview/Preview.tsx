import React, { useRef, useEffect } from 'react';

interface PreviewProps {
	displayCode: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', e => {
        try {
          eval(e.data);
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red"><h4>Runtime Error:</h4>' + err + '</div>'
          console.err(err);s
        }
      },false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ displayCode }) => {
	const iframe = useRef<any>(null);

	useEffect(() => {
		iframe.current.srcdoc = html;
		iframe.current.contentWindow.postMessage(displayCode, '*');
	}, [displayCode]);

	return (
		<div>
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
