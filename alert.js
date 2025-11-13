Swal.fire({
  title: 'Welcome to the Simon Game!',
  html: `
    <p><strong>How to Play:</strong></p>
    <p>1. Press any key to start the game.</p>
    <p>2. Simon will light up one color to begin the sequence.</p>
    <p>3. Watch and remember the sequence.</p>
    <p>4. Each round, Simon adds one new color to the pattern.</p>
    <p>5. Repeat the sequence by clicking the buttons in the same order.</p>
    <p>6. If you make a mistake, the game ends.</p>
  `,
  imageUrl:
    'https://i0.wp.com/retropond.com/wp-content/uploads/2021/07/Simon.gif?fit=480%2C270&ssl=1',
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: 'Custom image',
});
