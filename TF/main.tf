provider "aws" {
  region = "us-east-1"
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "lab-eks"
  cluster_version = "1.30"

  vpc_id = "vpc-0acff8e15777c766b"

  subnet_ids = [
    "subnet-04d1059e59e41b295",
    "subnet-043a0dd27f95acd01",
    "subnet-0af2346c471d5fbe7"
  ]

  enable_irsa = true

  eks_managed_node_groups = {
    default = {
      instance_types = ["t3.small"]
      desired_size   = 1
      max_size       = 2
      min_size       = 1
      ami_type = "AL2023_x86_64_STANDARD"
    }
  }
}