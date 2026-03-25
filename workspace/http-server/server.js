        </ul>
      </body>
    </html>
    
    res.end(responseHtml);
  });
});

server.listen(port, () => {
  console.log(`Starting HTTP server...
- Port: ${port}
- Root: ${directory}
- URL: http://${hostname}:${port}
Press Ctrl+C to stop
`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});