import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam'
import {Effect} from '@aws-cdk/aws-iam'
import * as s3 from '@aws-cdk/aws-s3'

export class AwsResourcesStack extends cdk.Stack {
    private S3_ROOT_DIR = "www.itluobo.com"

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        let user = this.createUserForUnityDeployment(this);
        this.createRoleForUnityDeployment(this, user);

        //for for english data
        this.createUserForEnglishData(this, "EnglishData");
    }

    private createUserForUnityDeployment(scope: cdk.Construct): iam.User {
        return new iam.User(scope, "UserForUnityDeployment", {
            userName: "UserForUnityDeployment",
            managedPolicies: [
                new iam.ManagedPolicy(this, "PermissionForUnityDeployment", {
                    managedPolicyName: "PermissionForUnityDeployment",
                    statements: [
                        new iam.PolicyStatement({
                            effect: Effect.ALLOW,
                            resources: ["arn:aws:s3:::www.itluobo.com/*"],
                            actions: [
                                "s3:*"
                            ]
                        })
                    ]
                })

            ]

        });
    }

    private createRoleForUnityDeployment(scope: cdk.Construct, user: iam.User): iam.Role {
        return new iam.Role(scope, "RoleForUnityDeployment", {
            roleName: "RoleForUnityDeployment",
            assumedBy: user,
            inlinePolicies: {
                ["AccessToItluobo"]: new iam.PolicyDocument({
                        statements: [
                            new iam.PolicyStatement({
                                effect: Effect.ALLOW,
                                resources: ["arn:aws:s3:::www.itluobo.com"],
                                actions: [
                                    "s3:*"
                                ]
                            })
                        ]
                    }
                )

            }

        });
    }

    private createUserForEnglishData(scope: cdk.Construct, userName: string): iam.User {
        return new iam.User(scope, userName, {
            userName: `UserFor${userName}`,
            managedPolicies: [
                new iam.ManagedPolicy(this, "PermissionForEnglishData", {
                    managedPolicyName: "PermissionForEnglishData",
                    statements: [
                        new iam.PolicyStatement({
                            effect: Effect.ALLOW,
                            resources: [
                                `arn:aws:s3:::${this.S3_ROOT_DIR}`,
                                `arn:aws:s3:::${this.S3_ROOT_DIR}/*`
                            ],
                            actions: [
                                "s3:PutObject",
                                "s3:ListBucket",
                                "s3:PutObjectAcl"
                            ]
                        })
                    ]
                })

            ]

        });
    }


}
