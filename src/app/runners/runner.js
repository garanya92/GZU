

addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('do something to update the system here');
  resolve();
});

addEventListener('npc', (resolve, reject, args) => {
  try {
    console.log('received silent push notification');

    CapacitorNotifications.schedule([
      {
        id: 100,
        title: 'Enterprise Background Runner',
        body: 'Received silent push notification',
      },
    ]);

    resolve();
  } catch (err) {
    reject();
  }
});

addEventListener('test', (resolve, reject, args) => {
  console.log('do something to update the system here');
  resolve();
});
