import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB;

// Helper function to get the database and collection
async function getCollection(collectionName) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(collectionName);
}

// READ (GET) operation
export async function GET(request) {
  try {
    console.log('GET request received for MongoDB API');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const collectionName = searchParams.get('collection');

    console.log(`Params - id: ${id}, collection: ${collectionName}`);

    if (!collectionName) {
      console.log('Collection name is missing');
      return NextResponse.json({ error: "Collection name is required" }, { status: 400 });
    }

    const collection = await getCollection(collectionName);
    console.log('Collection accessed successfully');

    if (id) {
      if (!ObjectId.isValid(id)) {
        console.log('Invalid ID provided');
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }
      console.log(`Fetching item with ID: ${id}`);
      const item = await collection.findOne({ _id: new ObjectId(id) });
      if (!item) {
        console.log('Item not found');
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      console.log('Item found, returning data');
      return NextResponse.json(item);
    } else {
      console.log(`Fetching all items from ${collectionName}`);
      const items = await collection.find({}).toArray();
      console.log(`Retrieved ${items.length} items`);
      return NextResponse.json(items);
    }
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}

// CREATE (POST) operation
export async function POST(request) {
  try {
    console.log('POST request received for MongoDB API');
    const { searchParams } = new URL(request.url);
    const collectionName = searchParams.get('collection');

    if (!collectionName) {
      console.log('Collection name is missing');
      return NextResponse.json({ error: "Collection name is required" }, { status: 400 });
    }

    const collection = await getCollection(collectionName);
    const data = await request.json();

    console.log(`Inserting new item into ${collectionName}`);
    const result = await collection.insertOne(data);
    console.log('Item inserted successfully');

    return NextResponse.json({ message: "Item created successfully", insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}

// UPDATE (PUT) operation
export async function PUT(request) {
  try {
    console.log('PUT request received for MongoDB API');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const collectionName = searchParams.get('collection');

    if (!collectionName || !id) {
      console.log('Collection name or ID is missing');
      return NextResponse.json({ error: "Collection name and ID are required" }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      console.log('Invalid ID provided');
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const collection = await getCollection(collectionName);
    const data = await request.json();

    console.log(`Updating item with ID: ${id} in ${collectionName}`);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      console.log('Item not found');
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    console.log('Item updated successfully');
    return NextResponse.json({ message: "Item updated successfully", modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}

// DELETE operation
export async function DELETE(request) {
  try {
    console.log('DELETE request received for MongoDB API');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const collectionName = searchParams.get('collection');

    if (!collectionName || !id) {
      console.log('Collection name or ID is missing');
      return NextResponse.json({ error: "Collection name and ID are required" }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      console.log('Invalid ID provided');
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const collection = await getCollection(collectionName);

    console.log(`Deleting item with ID: ${id} from ${collectionName}`);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      console.log('Item not found');
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    console.log('Item deleted successfully');
    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}