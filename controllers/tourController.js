const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, value) => {
  console.log(`tour id is ${value}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'Fail', message: 'Invalid ID' });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  console.log('ur body has dem');
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

// =============== BODY ===============
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // for clients to easily see how many objects in an array we're sending
    results: tours.length,
    data: {
      // same as tours: 'tours'
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = parseInt(req.params.id);

  const tour = tours.find((el) => {
    // Add this return
    return el.id === id;
  });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
