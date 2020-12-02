import React from 'react'
import '../../Cluster/myCluster.css'
import { Link } from 'react-router-dom';
import RegressionToolbar from './RegressionToolbar'
import { Jumbotron } from 'react-bootstrap';

const RegressionPreview = () => (

    <div className="d-flex">
        <RegressionToolbar />
        <div class="container-fluid">
            <div>
                <p>
                    This page describes regression
                    algorithms in MLlib.
                    Below show up details about each algorithm
                </p>

                <Jumbotron>
                <h1>Linear Regression</h1>
                <p>
                    In statistics, linear regression is a linear approach to modeling the relationship
                    between a scalar response (or dependent variable)
                    and one or more explanatory variables (or independent variables).
                </p>
                <a href="https://en.wikipedia.org/wiki/Linear_regression" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-secondary mr-1">Info</button></a>
                <Link to='/regression/LinearRegression'><button type="button" class="btn btn-primary">Run algorithm</button></Link>
                </Jumbotron>

                <Jumbotron>
                <h1>Random Forest Regression</h1>
                <p>
                    Random forests combine many decision trees in order to reduce the risk of overfitting
                </p>
                <a href="https://en.wikipedia.org/wiki/Random_forest" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-secondary mr-1">Info</button></a>
                <Link to='/regression/RandomForestRegression'><button type="button" class="btn btn-primary">Run algorithm</button></Link>
                </Jumbotron>

                <Jumbotron>
                <h1>Gradient-Boosted Tree Regression</h1>
                <p>
                    Gradient-Boosted Trees (GBTs) are ensembles of decision trees.
                </p>
                <a href="https://en.wikipedia.org/wiki/Gradient_boosting" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-secondary mr-1">Info</button></a>
                <Link to='/regression/GradientBoostedTreeRegressor'><button type="button" class="btn btn-primary">Run algorithm</button></Link>
                </Jumbotron>
            </div>
        </div>
    </div>
)

export default RegressionPreview;