import fetch from 'node-fetch';

const wakeUpDyno = (url: string, interval = 26, callback: any = () => {}): void => {
  const milliseconds = interval * 60000;

  setTimeout(() => {
    try {
      fetch(url).then(() => console.log(`Fetching ${url}.`));
    } catch (err) {
      console.log(`Error fetching ${url}: ${err.message}, trying again in ${interval} minutes...`);
    } finally {
      try {
        callback();
      } catch (err) {
        callback ? console.log('Callback failed: ', err.message) : null;
      } finally {
        return wakeUpDyno(url, interval, callback);
      }
    }
  }, milliseconds);
};

export default wakeUpDyno;
