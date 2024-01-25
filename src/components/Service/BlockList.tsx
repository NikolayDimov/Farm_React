import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import authHeader from '../../services/authHeader';

const BlockListContainer = styled.div`
  /* Add styles for the block list container */
`;

const BlockItem = styled.div`
  /* Add styles for individual block items */
  margin-bottom: 10px;
`;

interface Boundary {
  type: string;
  coordinates: number[][][] | number[][][][];
}

interface Block {
  id: string;
  name: string;
  boundary: Boundary;
  created: string;
  updated: string;
  deleted: string | null;
  soil: {
    id: string;
    name: string;
    created: string;
    updated: string;
    deleted: string | null;
    fields: any[]; // Update the type based on your actual structure
  };
  farm: {
    id: string;
    name: string;
    location: {
      type: string;
      coordinates: number[];
    };
    created: string;
    updated: string;
    deleted: string | null;
  };
}

interface BlockListProps {
  // Add any necessary props
}

const BlockList: React.FC<BlockListProps> = ({ /* props */ }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    // Fetch the list of blocks from the server
    const fetchBlocks = async () => {
      try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch('http://localhost:3000/field', {
          method: 'GET',
          headers,
        });

        if (response.ok) {
          const blocksData = await response.json();
          setBlocks(blocksData.data);
        } else {
          console.error('Failed to fetch blocks from the database');
        }
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    };

    fetchBlocks();
  }, []);

  return (
    <BlockListContainer>
      <h2>Block List</h2>
      {blocks.map((block) => (
        <BlockItem key={block.id}>
          <strong>Name:</strong> {block.name} | <strong>Farm:</strong> {block.farm.name} |{' '}
          <strong>Soil:</strong> {block.soil.name}
        </BlockItem>
      ))}
    </BlockListContainer>
  );
};

export default BlockList;
