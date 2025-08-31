#!/bin/bash
# setup_dev.sh
# Script to set up the development environment for Dev Personality Test

echo "Setting up development environment for Dev Personality Test..."

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Create the init script
cat > scripts/init.sh << 'EOF'
#!/bin/bash
echo "Initializing development environment..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies (if any)
# cd backend
# npm install
# cd ..

# Install database functions dependencies
# cd db/functions
# npm install
# cd ../..

echo "Development environment setup complete!"
echo "To start the development server, run:"
echo "cd frontend && npm run dev"
EOF

# Make the script executable
chmod +x scripts/init.sh

# Run the init script
./scripts/init.sh