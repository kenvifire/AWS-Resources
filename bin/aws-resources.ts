#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsResourcesStack } from '../lib/aws-resources-stack';

const app = new cdk.App();
new AwsResourcesStack(app, 'AwsResourcesStack');
