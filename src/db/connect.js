import mongoose from 'mongoose';
import config from 'config';

mongoose.connect(config.db.connectionSring, {
  useNewUrlParser: true,
});
