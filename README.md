# MARTIAN ROBOTS

Welcome to Mars!! 

To run this project please follow the commands below to get started: 

```
   npm i
   npm run dev
```
Navigate to http://localhost:5173/ to go to Mars. <br>
Sample data has been preopulated, to calculate the robots final destination please select `Go to Mars` and `Calculate your destinations` buttons.

Prerequisite
-
Node is required to run this project.

Technologies Used
-
- Vite
- React
- Typescript
- Tailwind CSS

Features
-
- Mars grid size validation to prevent negative numbers | [GridForm#isValidForm](src/components/forms/GridForm.tsx#isValidForm)

- Robot Culling | [RobotLanding](src/components/landing/RobotLanding.tsx)
  - When the grid size is updated any robots outside the new bounds will be removed
  - Remaining robots will have their final destination reset 
- Robot Validation | [RobotForm#isValidRobotCallback](src/components/forms/RobotForm.tsx#isValidRobotCallback)
  - Ensure robot can be correctly placed on mars | [helpers#isValidRobot](src/utils/helpers.ts#isValidRobot)
  - Provided path consists of only valid characters | [helpers#isValidPath](src/utils/helpers.ts#isValidPath)
- Robot pathing with scent markers when they die to warn other robots | [Robots#calculateFinalDestinations](src/components/Robots.tsx#calculateFinalDestinations)
- New Robots | [RobotForm#saveRobotForm](src/components/forms/RobotForm.tsx#saveRobotForm)
  - More robots can be added by using the Robot form section
  - Robot data can be reset to start over your journey around Mars
- Navigation
  - Back button introduced to be able to edit the Mars grid size | [RobotLanding#goBack](src/components/landing/RobotLanding.tsx#goBack)
- Responsive UI to accommodate mobile and desktop devices


Extensions
-
- Add more rotation commands eg 45º - By adding new entries into OrientationEnum and extending the updateOrientation function to include more cases
- Add more robot commands such as 'B' for backward movement or 'J' for jumping to skip over a cell.




