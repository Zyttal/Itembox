<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Item::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'item_description' => 'required'
        ]);

        $item = Item::create($fields);

        return $item;
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        return $item;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'item_description' => 'required'
        ]);

        $item->update($fields);

        return $item;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->delete();

        return ['message' => 'Item was Deleted!'];
    }
}
