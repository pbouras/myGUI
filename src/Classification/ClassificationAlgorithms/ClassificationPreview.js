import React from 'react'
import '../../Cluster/myCluster.css'
import { Link } from 'react-router-dom';
import '../../Cluster/Algorithms/Algorithms.css'
import ClassificationToolbar from './ClassificationToolbar'
import { Jumbotron } from 'react-bootstrap';

const ClassificationPreview = () => (

    <div className="d-flex">
        <ClassificationToolbar />
        <div class="container-fluid">
            <div>
                <p>
                    This page describes classification
                    algorithms in MLlib.
                    Below show up details about each algorithm
                </p>
                <Jumbotron>
                    <h1>Decision tree</h1>
                    <p> 
                        Decision trees and their ensembles are popular methods for the machine learning
                        tasks of classification and regression.<br />
                        Decision trees are widely used since they are easy to interpret,
                        handle categorical features,
                        extend to the multiclass classification setting,
                        do not require feature scaling,
                        and are able to capture non-linearities and feature interactions.
                    </p>
                    <a href="https://en.wikipedia.org/wiki/Decision_tree_learning" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-secondary mr-1">Info</button></a>
                    <Link to="/classification/DecisionTree"><button type="button" class="btn btn-primary">Run algorithm</button></Link>
                </Jumbotron>

                <Jumbotron>
                    <h1>Multilayer perceptron</h1>
                    <p> 
                        Multilayer perceptron classifier (MLPC) is a classifier based on the feedforward artificial
                        neural network. <br />
                        MLPC consists of multiple layers of nodes.
                        Each layer is fully connected to the next layer in the network.
                        Nodes in the input layer represent the input data.
                    </p>
                    <a href="https://en.wikipedia.org/wiki/Feedforward_neural_network" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-secondary mr-1">Info</button></a>
                    <Link to="/classification/MultilayerPerceptron"><button type="button" class="btn btn-primary">Run algorithm</button></Link>
                </Jumbotron>

                <Jumbotron>    
                    <h1>Linear Support Vector Machine</h1>
                    <p>
                        A support vector machine constructs a hyperplane or set of hyperplanes
                        in a high- or infinite-dimensional space,
                        which can be used for classification, regression, or other tasks.
                    </p>
                    <a href="https://en.wikipedia.org/wiki/Support_vector_machine" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-secondary mr-1">Info</button></a>
                    <Link to="/classification/LinearSVM"><button type="button" class="btn btn-primary">Run algorithm</button></Link>
                </Jumbotron>

                <Jumbotron>    
                    <h1>Naive Bayes</h1>
                    <p>
                        Naive Bayes classifiers are a family of simple probabilistic, multiclass classifiers based on applying Bayes’ theorem with strong (naive) independence assumptions between every pair of features.<br/>
                        Naive Bayes can be trained very efficiently. 
                        With a single pass over the training data, it computes the conditional probability distribution of each feature given each label. 
                        For prediction, it applies Bayes’ theorem to compute the conditional probability distribution of each label given an observation.
                    </p>
                    <a href="https://en.wikipedia.org/wiki/Naive_Bayes_classifier" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-secondary mr-1">Info</button></a>
                    <Link to="/classification/NaiveBayes"><button type="button" class="btn btn-primary">Run algorithm</button></Link>
                </Jumbotron>

            </div>
        </div>
    </div>

)

export default ClassificationPreview;