variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-0dfcb1ef8550277af" # Ubuntu 22.04 LTS
}

variable "ssh_username" {
  type    = string
  default = "ec2-user"
}

variable "vpc_id" {
  type    = string
  default = "vpc-01276ec252f7960ce"
}

variable "subnet_id" {
  type    = string
  default = "subnet-051481c62c6ff86a6"
}

// variable "DBUSER" {
//   type = string
// }

// variable "DBPASS" {
//   type = string
// }


// variable "DBHOST" {
//   type = string
// }

// variable "PORT" {
//   type = string
// }

// variable "DBPORT" {
//   type = string
// }

// variable "DATABASE" {
//   type = string
// }

variable "ami_users" {
  type    = list(string)
  default = ["680696435068"]
}

source "amazon-ebs" "app-ami" {
  region          = "${var.aws_region}"
  ami_name        = "ami-1"
  ami_description = "AMI test"
  ami_users       =   var.ami_users
  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }


  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"
  vpc_id = "${var.vpc_id}"
  profile       = "dev"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.app-ami"]
  
  provisioner "file" {
      source = "./webapp.zip"
      destination = "/home/ec2-user/webapp.zip"
  }

  provisioner "shell" {
    // environment_vars = [
    //   "DEBIAN_FRONTEND=noninteractive",
    //   "CHECKPOINT_DISABLE=1"
    // ]

    script = "./webapp.sh"
    // environment_vars = ["DBUSER=${var.DBUSER}", "DBPASS=${var.DBPASS}", "DBHOST=${var.DBHOST}", "PORT=${var.PORT}", "DATABASE=${var.DATABASE}", "DBPORT=${var.DBPORT}"]

  }
}