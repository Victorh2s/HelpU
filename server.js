import cors from 'cors';
import app from './app';

app.use(cors());

const port = 3003;
app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + Clique em http://localhost:${port}`);
});
