#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies using pip
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files for production
python manage.py collectstatic --no-input
